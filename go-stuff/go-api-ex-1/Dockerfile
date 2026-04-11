# Build stage
FROM golang:1.23 AS builder

WORKDIR /app

# Copy go mod files first for better cache
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the binary
RUN CGO_ENABLED=1 go build -o server ./cmd/server/main.go

# Runtime stage
FROM debian:bookworm-slim

# Install required libraries for DuckDB
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/server .

# Create data directory
RUN mkdir -p /app/data

# Environment variables
ENV PORT=8080
ENV DUCKDB_PATH=/app/data/nav.duckdb

EXPOSE 8080

# Run as non-root user for security
RUN useradd -m -u 1001 appuser && chown -R appuser:appuser /app
USER appuser

CMD ["./server"]
