package main

import (
	"log"

	"github.com/chandan/go-api-ex-1/internal/handler"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	v1 := r.Group("/api/v1")
	handler.RegisterHealthRoutes(v1)

	log.Println("Starting server on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
