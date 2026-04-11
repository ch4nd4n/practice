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
	// Get DuckDB path from env or use default
	dbPath := os.Getenv("DUCKDB_PATH")
	if dbPath == "" {
		dbPath = "./data/nav.duckdb"
	}

	// Append read-only parameter - required when DuckDB CLI may have the file open
	dbPath = dbPath + "?access_mode=read_only"

	// Initialize DuckDB repository
	log.Printf("Connecting to DuckDB at %s...", dbPath)
	navRepo, err := repository.NewNAVRepository(dbPath)
	if err != nil {
		log.Fatalf("Failed to connect to DuckDB: %v", err)
	}
	defer navRepo.Close()
	log.Println("Connected to DuckDB successfully")

	// Initialize service and handler
	navService := service.NewNAVService(navRepo)
	navHandler := handler.NewNAVHandler(navService)

	// Setup Gin router
	r := gin.Default()

	v1 := r.Group("/api/v1")
	handler.RegisterHealthRoutes(v1)
	navHandler.RegisterRoutes(v1)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting server on :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
