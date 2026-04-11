package handler

import (
	"net/http"

	"github.com/chandan/go-api-ex-1/internal/service"
	"github.com/gin-gonic/gin"
)

// NAVHandler handles NAV-related HTTP requests
type NAVHandler struct {
	service *service.NAVService
}

// NewNAVHandler creates a new NAV handler instance
func NewNAVHandler(service *service.NAVService) *NAVHandler {
	return &NAVHandler{service: service}
}

// RegisterRoutes registers NAV routes with the router group
func (h *NAVHandler) RegisterRoutes(rg *gin.RouterGroup) {
	rg.GET("/nav/:isin", h.GetNAV)
	rg.GET("/nav/:isin/latest", h.GetLatestNAV)
	rg.GET("/nav/:isin/history", h.GetNAVHistory)
	rg.GET("/nav/code/:code", h.GetNAVByCode)
}

// GetNAV handles GET /api/v1/nav/:isin?date=YYYY-MM-DD
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

// GetLatestNAV handles GET /api/v1/nav/:isin/latest
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

// GetNAVHistory handles GET /api/v1/nav/:isin/history?from=YYYY-MM-DD&to=YYYY-MM-DD
func (h *NAVHandler) GetNAVHistory(c *gin.Context) {
	isin := c.Param("isin")
	from := c.Query("from")
	to := c.Query("to")

	history, err := h.service.GetNAVHistory(c.Request.Context(), isin, from, to)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, history)
}

// GetNAVByCode handles GET /api/v1/nav/code/:code
func (h *NAVHandler) GetNAVByCode(c *gin.Context) {
	code := c.Param("code")

	records, err := h.service.GetNAVByCode(c.Request.Context(), code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    code,
		"count":   len(records),
		"records": records,
	})
}
