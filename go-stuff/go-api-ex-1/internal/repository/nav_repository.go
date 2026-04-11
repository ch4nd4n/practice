package repository

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	_ "github.com/marcboeker/go-duckdb"
)

// NAVRecord represents a single NAV data entry
type NAVRecord struct {
	ISIN string    `json:"isin"`
	Date time.Time `json:"date"`
	NAV  float64   `json:"nav"`
	Code string    `json:"code,omitempty"`
}

// NAVRepository handles database operations for NAV data
type NAVRepository struct {
	db *sql.DB
}

// NewNAVRepository creates a new repository instance
func NewNAVRepository(dbPath string) (*NAVRepository, error) {
	db, err := sql.Open("duckdb", dbPath)
	if err != nil {
		return nil, fmt.Errorf("open duckdb: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("ping duckdb: %w", err)
	}

	return &NAVRepository{db: db}, nil
}

// Close closes the database connection
func (r *NAVRepository) Close() error {
	return r.db.Close()
}

// GetByISINAndDate retrieves NAV for specific ISIN and date
func (r *NAVRepository) GetByISINAndDate(ctx context.Context, isin string, date time.Time) (*NAVRecord, error) {
	query := `
		SELECT isin, date, nav, code 
		FROM nav_data 
		WHERE isin = ? AND date = ?
	`

	row := r.db.QueryRowContext(ctx, query, isin, date)

	var record NAVRecord
	err := row.Scan(&record.ISIN, &record.Date, &record.NAV, &record.Code)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("scan nav record: %w", err)
	}

	return &record, nil
}

// GetByISIN retrieves all NAV records for an ISIN
func (r *NAVRepository) GetByISIN(ctx context.Context, isin string, limit int) ([]NAVRecord, error) {
	if limit <= 0 {
		limit = 1000
	}

	query := `
		SELECT isin, date, nav, code 
		FROM nav_data 
		WHERE isin = ?
		ORDER BY date DESC
		LIMIT ?
	`

	rows, err := r.db.QueryContext(ctx, query, isin, limit)
	if err != nil {
		return nil, fmt.Errorf("query nav by isin: %w", err)
	}
	defer rows.Close()

	var records []NAVRecord
	for rows.Next() {
		var rec NAVRecord
		if err := rows.Scan(&rec.ISIN, &rec.Date, &rec.NAV, &rec.Code); err != nil {
			return nil, fmt.Errorf("scan nav row: %w", err)
		}
		records = append(records, rec)
	}

	return records, rows.Err()
}

// GetByDateRange retrieves NAV records for an ISIN within a date range
func (r *NAVRepository) GetByDateRange(ctx context.Context, isin string, from, to time.Time) ([]NAVRecord, error) {
	query := `
		SELECT isin, date, nav, code 
		FROM nav_data 
		WHERE isin = ? AND date BETWEEN ? AND ?
		ORDER BY date DESC
	`

	rows, err := r.db.QueryContext(ctx, query, isin, from, to)
	if err != nil {
		return nil, fmt.Errorf("query nav by date range: %w", err)
	}
	defer rows.Close()

	var records []NAVRecord
	for rows.Next() {
		var rec NAVRecord
		if err := rows.Scan(&rec.ISIN, &rec.Date, &rec.NAV, &rec.Code); err != nil {
			return nil, fmt.Errorf("scan nav row: %w", err)
		}
		records = append(records, rec)
	}

	return records, rows.Err()
}

// GetLatestNAV retrieves the most recent NAV for an ISIN
func (r *NAVRepository) GetLatestNAV(ctx context.Context, isin string) (*NAVRecord, error) {
	query := `
		SELECT isin, date, nav, code 
		FROM nav_data 
		WHERE isin = ?
		ORDER BY date DESC
		LIMIT 1
	`

	row := r.db.QueryRowContext(ctx, query, isin)

	var record NAVRecord
	err := row.Scan(&record.ISIN, &record.Date, &record.NAV, &record.Code)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("scan latest nav: %w", err)
	}

	return &record, nil
}

// GetISINsByCode retrieves all ISINs for a given code
func (r *NAVRepository) GetISINsByCode(ctx context.Context, code string) ([]string, error) {
	query := `
		SELECT DISTINCT isin 
		FROM nav_data 
		WHERE code = ?
		ORDER BY isin
	`

	rows, err := r.db.QueryContext(ctx, query, code)
	if err != nil {
		return nil, fmt.Errorf("query isins by code: %w", err)
	}
	defer rows.Close()

	var isins []string
	for rows.Next() {
		var isin string
		if err := rows.Scan(&isin); err != nil {
			return nil, fmt.Errorf("scan isin: %w", err)
		}
		isins = append(isins, isin)
	}

	return isins, rows.Err()
}
