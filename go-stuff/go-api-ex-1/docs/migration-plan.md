# Migration Plan: SQLite nav_data → DuckDB → Go API

## Overview

Migrate NAV (Net Asset Value) data from existing SQLite database to DuckDB and expose via Go API endpoint.

## Source & Target

- **Source**: `~/code/github/apps/packages/data-drizzle/test.db` (SQLite)
- **Target**: `./data/nav.duckdb` (DuckDB file)
- **Table**: `nav_data`

## Schema Mapping

| Source (SQLite) | Target (DuckDB) | Type       | Notes                     |
|-----------------|-----------------|------------|---------------------------|
| isin            | isin            | VARCHAR    | Composite unique key      |
| date            | date            | DATE       | Parse from text           |
| nav             | nav             | DECIMAL    | Real → precise decimal    |
| code            | code            | VARCHAR    |                           |

## Phase 1: Data Migration

### Step 1.1: Create DuckDB database with schema

```sql
-- Create DuckDB database
-- duckdb ./data/nav.duckdb

CREATE TABLE nav_data (
    isin VARCHAR NOT NULL,
    date DATE NOT NULL,
    nav DECIMAL(12, 6) NOT NULL,
    code VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (isin, date)
);

-- Create index for common queries
CREATE INDEX idx_nav_data_date ON nav_data(date);
CREATE INDEX idx_nav_data_code ON nav_data(code);
```

### Step 1.2: Import from SQLite

DuckDB can read SQLite directly:

```sql
-- Attach SQLite database
INSTALL sqlite;
LOAD sqlite;

ATTACH '~/code/github/apps/packages/data-drizzle/test.db' AS sqlite_db;

-- Insert data with type conversion
INSERT INTO nav_data (isin, date, nav, code)
SELECT 
    isin,
    CAST(date AS DATE),
    CAST(nav AS DECIMAL(12, 6)),
    code
FROM sqlite_db.nav_data;

-- Verify count
SELECT COUNT(*) FROM nav_data;

DETACH sqlite_db;
```

### Alternative: Use duckdb CLI command

```bash
mkdir -p data

duckdb ./data/nav.duckdb < sql/migrate.sql
```

## Phase 2: Go API Integration

### Step 2.1: Add DuckDB driver

```bash
go get github.com/marcboeker/go-duckdb
```

### Step 2.2: Create repository layer

File: `internal/repository/nav_repository.go`

```go
package repository

import (
    "context"
    "database/sql"
    "fmt"
    "time"

    _ "github.com/marcboeker/go-duckdb"
)

type NAVRecord struct {
    ISIN  string    `json:"isin"`
    Date  time.Time `json:"date"`
    NAV   float64   `json:"nav"`
    Code  string    `json:"code,omitempty"`
}

type NAVRepository struct {
    db *sql.DB
}

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
func (r *NAVRepository) GetByISIN(ctx context.Context, isin string) ([]NAVRecord, error) {
    query := `
        SELECT isin, date, nav, code 
        FROM nav_data 
        WHERE isin = ?
        ORDER BY date DESC
    `
    
    rows, err := r.db.QueryContext(ctx, query, isin)
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
```

### Step 2.3: Create service layer

File: `internal/service/nav_service.go`

```go
package service

import (
    "context"
    "fmt"
    "time"
    
    "github.com/chandan/go-api-ex-1/internal/repository"
)

type NAVService struct {
    repo *repository.NAVRepository
}

func NewNAVService(repo *repository.NAVRepository) *NAVService {
    return &NAVService{repo: repo}
}

type NAVResponse struct {
    ISIN     string  `json:"isin"`
    Date     string  `json:"date"`     // YYYY-MM-DD
    NAV      float64 `json:"nav"`
    Code     string  `json:"code,omitempty"`
}

func (s *NAVService) GetNAV(ctx context.Context, isin string, date string) (*NAVResponse, error) {
    parsedDate, err := time.Parse("2006-01-02", date)
    if err != nil {
        return nil, fmt.Errorf("invalid date format, expected YYYY-MM-DD: %w", err)
    }
    
    record, err := s.repo.GetByISINAndDate(ctx, isin, parsedDate)
    if err != nil {
        return nil, err
    }
    if record == nil {
        return nil, nil
    }
    
    return &NAVResponse{
        ISIN: record.ISIN,
        Date: record.Date.Format("2006-01-02"),
        NAV:  record.NAV,
        Code: record.Code,
    }, nil
}

func (s *NAVService) GetNAVHistory(ctx context.Context, isin string, from, to string) ([]NAVResponse, error) {
    var fromDate, toDate time.Time
    var err error
    
    if from != "" {
        fromDate, err = time.Parse("2006-01-02", from)
        if err != nil {
            return nil, fmt.Errorf("invalid from date: %w", err)
        }
    } else {
        fromDate = time.Now().AddDate(-1, 0, 0) // Default: 1 year ago
    }
    
    if to != "" {
        toDate, err = time.Parse("2006-01-02", to)
        if err != nil {
            return nil, fmt.Errorf("invalid to date: %w", err)
        }
    } else {
        toDate = time.Now()
    }
    
    records, err := s.repo.GetByDateRange(ctx, isin, fromDate, toDate)
    if err != nil {
        return nil, err
    }
    
    var response []NAVResponse
    for _, r := range records {
        response = append(response, NAVResponse{
            ISIN: r.ISIN,
            Date: r.Date.Format("2006-01-02"),
            NAV:  r.NAV,
            Code: r.Code,
        })
    }
    
    return response, nil
}

func (s *NAVService) GetLatestNAV(ctx context.Context, isin string) (*NAVResponse, error) {
    record, err := s.repo.GetLatestNAV(ctx, isin)
    if err != nil {
        return nil, err
    }
    if record == nil {
        return nil, nil
    }
    
    return &NAVResponse{
        ISIN: record.ISIN,
        Date: record.Date.Format("2006-01-02"),
        NAV:  record.NAV,
        Code: record.Code,
    }, nil
}
```

### Step 2.4: Create handler

File: `internal/handler/nav_handler.go`

```go
package handler

import (
    "net/http"
    
    "github.com/chandan/go-api-ex-1/internal/service"
    "github.com/gin-gonic/gin"
)

type NAVHandler struct {
    service *service.NAVService
}

func NewNAVHandler(service *service.NAVService) *NAVHandler {
    return &NAVHandler{service: service}
}

func (h *NAVHandler) RegisterRoutes(rg *gin.RouterGroup) {
    rg.GET("/nav/:isin", h.GetNAV)
    rg.GET("/nav/:isin/latest", h.GetLatestNAV)
    rg.GET("/nav/:isin/history", h.GetNAVHistory)
}

// GetNAV godoc
// @Summary Get NAV for ISIN on specific date
// @Description Get Net Asset Value for a specific ISIN and date
// @Tags nav
// @Accept json
// @Produce json
// @Param isin path string true "ISIN code"
// @Param date query string true "Date in YYYY-MM-DD format"
// @Success 200 {object} service.NAVResponse
// @Failure 404 {object} map[string]string
// @Router /api/v1/nav/{isin} [get]
func (h *NAVHandler) GetNAV(c *gin.Context) {
    isin := c.Param("isin")
    date := c.Query("date")
    
    if date == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "date parameter is required (YYYY-MM-DD)"})
        return
    }
    
    nav, err := h.service.GetNAV(c.Request.Context(), isin, date)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    if nav == nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "NAV not found"})
        return
    }
    
    c.JSON(http.StatusOK, nav)
}

// GetLatestNAV godoc
// @Summary Get latest NAV for ISIN
// @Description Get most recent Net Asset Value for a specific ISIN
// @Tags nav
// @Accept json
// @Produce json
// @Param isin path string true "ISIN code"
// @Success 200 {object} service.NAVResponse
// @Failure 404 {object} map[string]string
// @Router /api/v1/nav/{isin}/latest [get]
func (h *NAVHandler) GetNAVHistory(c *gin.Context) {
    isin := c.Param("isin")
    from := c.Query("from")
    to := c.Query("to")
    
    history, err := h.service.GetNAVHistory(c.Request.Context(), isin, from, to)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, gin.H{
        "isin":    isin,
        "count":   len(history),
        "history": history,
    })
}

// GetNAVHistory godoc
// @Summary Get NAV history for ISIN
// @Description Get NAV history for a specific ISIN with optional date range
// @Tags nav
// @Accept json
// @Produce json
// @Param isin path string true "ISIN code"
// @Param from query string false "Start date (YYYY-MM-DD)"
// @Param to query string false "End date (YYYY-MM-DD)"
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/nav/{isin}/history [get]
func (h *NAVHandler) GetLatestNAV(c *gin.Context) {
    isin := c.Param("isin")
    
    nav, err := h.service.GetLatestNAV(c.Request.Context(), isin)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    if nav == nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "No NAV data found for ISIN"})
        return
    }
    
    c.JSON(http.StatusOK, nav)
}
```

### Step 2.5: Update main.go

```go
package main

import (
    "log"
    "os"
    
    "github.com/chandan/go-api-ex-1/internal/handler"
    "github.com/chandan/go-api-ex-1/internal/repository"
    "github.com/chandan/go-api-ex-1/internal/service"
    "github.com/gin-gonic/gin"
)

func main() {
    // Initialize DuckDB repository
    navRepo, err := repository.NewNAVRepository("./data/nav.duckdb")
    if err != nil {
        log.Fatalf("Failed to connect to DuckDB: %v", err)
    }
    defer navRepo.Close()
    
    // Initialize service and handler
    navService := service.NewNAVService(navRepo)
    navHandler := handler.NewNAVHandler(navService)
    
    r := gin.Default()
    
    v1 := r.Group("/api/v1")
    handler.RegisterHealthRoutes(v1)
    navHandler.RegisterRoutes(v1)
    
    log.Println("Starting server on :8080")
    if err := r.Run(":8080"); err != nil {
        log.Fatal(err)
    }
}
```

## Phase 3: API Endpoints

| Method | Path | Description | Query Params |
|--------|------|-------------|--------------|
| GET | `/api/v1/nav/:isin` | Get NAV for specific date | `date` (required) |
| GET | `/api/v1/nav/:isin/latest` | Get most recent NAV | - |
| GET | `/api/v1/nav/:isin/history` | Get NAV history | `from`, `to` |

## Example Requests

```bash
# Get NAV for specific date
curl "http://localhost:8080/api/v1/nav/INE001A12345?date=2024-03-15"

# Get latest NAV
curl "http://localhost:8080/api/v1/nav/INE001A12345/latest"

# Get NAV history (last year by default)
curl "http://localhost:8080/api/v1/nav/INE001A12345/history"

# Get NAV history with date range
curl "http://localhost:8080/api/v1/nav/INE001A12345/history?from=2024-01-01&to=2024-03-31"
```

## Data Refresh Strategy

Option A: One-time migration (simple)
```bash
# Run once to populate DuckDB
duckdb ./data/nav.duckdb < sql/migrate.sql
```

Option B: Periodic sync (if source updates)
```bash
# Add to cron or run manually when needed
./scripts/refresh-nav.sh
```

File: `scripts/refresh-nav.sh`
```bash
#!/bin/bash
set -e

DUCKDB_PATH="./data/nav.duckdb"
SQLITE_PATH="$HOME/code/github/apps/packages/data-drizzle/test.db"

echo "Refreshing NAV data..."

duckdb "$DUCKDB_PATH" <<EOF
INSTALL sqlite;
LOAD sqlite;
ATTACH '$SQLITE_PATH' AS sqlite_db;

-- Truncate and reload
TRUNCATE TABLE nav_data;

INSERT INTO nav_data (isin, date, nav, code)
SELECT 
    isin,
    CAST(date AS DATE),
    CAST(nav AS DECIMAL(12, 6)),
    code
FROM sqlite_db.nav_data;

DETACH sqlite_db;

SELECT 'Rows imported: ' || COUNT(*) FROM nav_data;
EOF

echo "Done."
```

## Next Steps

1. **Install DuckDB locally**: `brew install duckdb` (macOS) or [download](https://duckdb.org/docs/installation/)
2. **Run migration**: Create `./data/nav.duckdb` and import data
3. **Add go-duckdb driver**: `go get github.com/marcboeker/go-duckdb`
4. **Implement repository/service/handler** files above
5. **Test endpoints**: Use the example requests

## Prerequisites

- DuckDB CLI installed
- `go-duckdb` driver (CGO required)
- CGO enabled for Go build (`CGO_ENABLED=1`)

## Notes

- DuckDB uses CGO, which requires gcc/clang installed
- For production, consider connection pooling and prepared statements
- DuckDB is read-optimized; excellent for analytical queries on NAV history
