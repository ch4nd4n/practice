package service

import (
	"context"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/chandan/go-api-ex-1/internal/repository"
)

// NAVService handles business logic for NAV operations
type NAVService struct {
	repo *repository.NAVRepository
}

// NAVMeta represents metadata for NAV responses
type NAVMeta struct {
	Count       int    `json:"count"`
	Currency    string `json:"currency"`
	Period      string `json:"period,omitempty"`
	StartDate   string `json:"start_date"`
	EndDate     string `json:"end_date"`
	DataQuality string `json:"data_quality,omitempty"`
}

// NAVDataPoint represents a single NAV data point with calculated fields
type NAVDataPoint struct {
	ISIN         string  `json:"isin"`
	Date         string  `json:"date"`
	NAV          float64 `json:"nav"`
	PrevClose    float64 `json:"prev_close,omitempty"`
	Change       float64 `json:"change,omitempty"`
	ChangePercent float64 `json:"change_percent,omitempty"`
	Code         string  `json:"code,omitempty"`
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
	ISIN    string         `json:"isin"`
	Meta    NAVMeta        `json:"meta"`
	History []NAVDataPoint `json:"history"`
}

// NewNAVService creates a new NAV service instance
func NewNAVService(repo *repository.NAVRepository) *NAVService {
	return &NAVService{repo: repo}
}

// CalculateChangePercent calculates percentage change between current and previous value
func CalculateChangePercent(current, previous float64) float64 {
	if previous == 0 {
		return 0
	}
	return ((current - previous) / previous) * 100
}

// ParsePeriod parses period strings like "1Y", "6M", "3M", "1M", "YTD"
// Returns from date, to date (latest), and the period label
func ParsePeriod(period string, now time.Time) (from, to time.Time, label string, err error) {
	period = strings.ToUpper(period)
	to = now

	switch period {
	case "1Y", "12M":
		from = now.AddDate(-1, 0, 0)
		label = "1_year"
	case "6M":
		from = now.AddDate(0, -6, 0)
		label = "6_months"
	case "3M":
		from = now.AddDate(0, -3, 0)
		label = "3_months"
	case "1M":
		from = now.AddDate(0, -1, 0)
		label = "1_month"
	case "YTD":
		from = time.Date(now.Year(), 1, 1, 0, 0, 0, 0, now.Location())
		label = "ytd"
	case "1W":
		from = now.AddDate(0, 0, -7)
		label = "1_week"
	default:
		// Try to parse as numeric months
		if strings.HasSuffix(period, "M") {
			months, _ := strconv.Atoi(strings.TrimSuffix(period, "M"))
			if months > 0 {
				from = now.AddDate(0, -months, 0)
				label = fmt.Sprintf("%d_months", months)
				return from, to, label, nil
			}
		}
		// Try to parse as numeric years
		if strings.HasSuffix(period, "Y") {
			years, _ := strconv.Atoi(strings.TrimSuffix(period, "Y"))
			if years > 0 {
				from = now.AddDate(-years, 0, 0)
				label = fmt.Sprintf("%d_years", years)
				return from, to, label, nil
			}
		}
		return time.Time{}, time.Time{}, "", fmt.Errorf("invalid period: %s (use 1Y, 6M, 3M, 1M, YTD, 1W)", period)
	}

	return from, to, label, nil
}

// ParseInterval parses interval strings into repository interval type
func ParseInterval(interval string) repository.Interval {
	switch strings.ToLower(interval) {
	case "1w", "weekly", "week":
		return repository.IntervalWeekly
	case "1m", "monthly", "month":
		return repository.IntervalMonthly
	case "1y", "yearly", "year":
		return repository.IntervalYearly
	default:
		return repository.IntervalDaily
	}
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

// GetNAVHistory retrieves NAV history for an ISIN
// Supports: from/to dates, period (1Y, 6M, 3M, 1M, YTD, 1W), interval (daily, weekly, monthly)
func (s *NAVService) GetNAVHistory(ctx context.Context, isin string, from, to, period, interval string) (*NAVHistoryResponse, error) {
	var fromDate, toDate time.Time
	var err error
	var periodLabel string

	// Priority: period > from/to
	if period != "" {
		fromDate, toDate, periodLabel, err = ParsePeriod(period, time.Now())
		if err != nil {
			return nil, err
		}
	} else {
		// Parse from date
		if from != "" {
			fromDate, err = time.Parse("2006-01-02", from)
			if err != nil {
				return nil, fmt.Errorf("invalid from date: %w", err)
			}
		} else {
			// Default: 1 year if no from date
			fromDate = time.Now().AddDate(-1, 0, 0)
			periodLabel = "1_year"
		}

		// Parse to date
		if to != "" {
			toDate, err = time.Parse("2006-01-02", to)
			if err != nil {
				return nil, fmt.Errorf("invalid to date: %w", err)
			}
		} else {
			toDate = time.Now()
		}
	}

	// Parse interval
	parsedInterval := ParseInterval(interval)

	// Get available date range for this ISIN
	minAvailDate, maxAvailDate, err := s.repo.GetDateRange(ctx, isin)
	if err == nil && !minAvailDate.IsZero() {
		// Adjust dates if outside available range
		if fromDate.Before(minAvailDate) {
			fromDate = minAvailDate
		}
		if toDate.After(maxAvailDate) {
			toDate = maxAvailDate
		}
	}

	records, err := s.repo.GetByDateRangeWithInterval(ctx, isin, fromDate, toDate, parsedInterval)
	if err != nil {
		return nil, err
	}

	// Convert to response format with calculated fields
	history := make([]NAVDataPoint, len(records))
	for i, r := range records {
		point := NAVDataPoint{
			ISIN: r.ISIN,
			Date: r.Date.Format("2006-01-02"),
			NAV:  r.NAV,
			Code: r.Code,
		}

		// Calculate change from previous NAV if available
		if r.PrevNAV != nil && *r.PrevNAV > 0 {
			point.PrevClose = *r.PrevNAV
			point.Change = r.NAV - *r.PrevNAV
			point.ChangePercent = CalculateChangePercent(r.NAV, *r.PrevNAV)
		}

		history[i] = point
	}

	// Build meta information
	meta := NAVMeta{
		Count:    len(history),
		Currency: "INR",
		StartDate: fromDate.Format("2006-01-02"),
		EndDate:   toDate.Format("2006-01-02"),
	}

	if periodLabel != "" {
		meta.Period = periodLabel
	}

	// Add interval info
	if interval != "" {
		if meta.Period != "" {
			meta.Period += "_" + string(parsedInterval)
		}
	}

	return &NAVHistoryResponse{
		ISIN:    isin,
		Meta:    meta,
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
