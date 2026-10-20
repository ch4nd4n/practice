# Multi-stage build: compile inside container (no cross-compile needed)
FROM golang:1.24-bookworm AS builder

WORKDIR /app

# Cache dependencies
COPY go.mod go.sum ./
RUN go mod download

# Build with CGO enabled (required by go-duckdb)
COPY . .
RUN CGO_ENABLED=1 GOOS=linux go build -o server ./cmd/server/main.go

# Runtime stage
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/server ./server

RUN mkdir -p /app/data

ENV PORT=8080
ENV DUCKDB_PATH=/app/data/nav.duckdb

EXPOSE 8080

RUN useradd -m -u 1001 appuser && chown -R appuser:appuser /app
USER appuser

CMD ["./server"]
