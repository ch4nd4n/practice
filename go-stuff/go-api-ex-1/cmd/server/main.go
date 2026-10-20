package main

import (
	"log/slog"
	"os"

	"github.com/chandan/go-api-ex-1/internal/handler"
	"github.com/chandan/go-api-ex-1/internal/middleware"
	"github.com/chandan/go-api-ex-1/internal/repository"
	"github.com/chandan/go-api-ex-1/internal/service"
	"github.com/gin-gonic/gin"
)

func main() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))

	// Get DuckDB path from env or use default
	dbPath := os.Getenv("DUCKDB_PATH")
	if dbPath == "" {
		dbPath = "./data/nav.duckdb"
	}

	// Append read-only parameter - required when DuckDB CLI may have the file open
	dbPath = dbPath + "?access_mode=read_only"

	// Initialize DuckDB repository
	slog.Info("connecting to DuckDB", "path", dbPath)
	navRepo, err := repository.NewNAVRepository(dbPath)
	if err != nil {
		slog.Error("failed to connect to DuckDB", "error", err)
		os.Exit(1)
	}
	defer navRepo.Close()
	slog.Info("connected to DuckDB successfully")

	// Initialize service and handler
	navService := service.NewNAVService(navRepo)
	navHandler := handler.NewNAVHandler(navService)

	// Setup Gin router
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	r.Use(gin.Recovery(), middleware.StructuredLogger())

	v1 := r.Group("/api/v1")
	handler.RegisterHealthRoutes(v1)
	navHandler.RegisterRoutes(v1)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	slog.Info("starting server", "port", port)
	if err := r.Run(":" + port); err != nil {
		slog.Error("server failed", "error", err)
		os.Exit(1)
	}
}
