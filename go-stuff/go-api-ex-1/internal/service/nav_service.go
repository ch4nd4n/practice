package service

import (
	"context"
	"fmt"
	"time"

	"github.com/chandan/go-api-ex-1/internal/repository"
)

// NAVService handles business logic for NAV operations
type NAVService struct {
	repo *repository.NAVRepository
}

// NAVResponse represents the API response for NAV data
type NAVResponse struct {
	ISIN string  `json:"isin"`
	Date string  `json:"date"` // YYYY-MM-DD
	NAV  float64 `json:"nav"`
	Code string  `json:"code,omitempty"`
}

// NAVHistoryResponse represents the API response for NAV history
type NAVHistoryResponse struct {
	ISIN    string        `json:"isin"`
	Count   int           `json:"count"`
	History []NAVResponse `json:"history"`
}

// NewNAVService creates a new NAV service instance
func NewNAVService(repo *repository.NAVRepository) *NAVService {
	return &NAVService{repo: repo}
}

// GetNAV retrieves NAV for a specific ISIN and date
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

// GetNAVHistory retrieves NAV history for an ISIN with optional date range
func (s *NAVService) GetNAVHistory(ctx context.Context, isin string, from, to string) (*NAVHistoryResponse, error) {
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

	history := make([]NAVResponse, len(records))
	for i, r := range records {
		history[i] = NAVResponse{
			ISIN: r.ISIN,
			Date: r.Date.Format("2006-01-02"),
			NAV:  r.NAV,
			Code: r.Code,
		}
	}

	return &NAVHistoryResponse{
		ISIN:    isin,
		Count:   len(history),
		History: history,
	}, nil
}

// GetLatestNAV retrieves the most recent NAV for an ISIN
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

// GetNAVByCode retrieves the latest NAV for a given code
func (s *NAVService) GetNAVByCode(ctx context.Context, code string) ([]NAVResponse, error) {
	isins, err := s.repo.GetISINsByCode(ctx, code)
	if err != nil {
		return nil, err
	}

	var results []NAVResponse
	for _, isin := range isins {
		record, err := s.repo.GetLatestNAV(ctx, isin)
		if err != nil {
			continue
		}
		if record == nil {
			continue
		}

		results = append(results, NAVResponse{
			ISIN: record.ISIN,
			Date: record.Date.Format("2006-01-02"),
			NAV:  record.NAV,
			Code: record.Code,
		})
	}

	return results, nil
}
