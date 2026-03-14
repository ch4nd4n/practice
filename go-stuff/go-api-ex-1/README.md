# Finark Go API

Go re-implementation of the Finark core API using Gin.

## Project Structure

```
cmd/server/          — Application entry point
internal/
  handler/           — HTTP handlers (presentation layer)
  service/           — Business logic
  repository/        — Data access
  model/             — Domain models and DTOs
docs/
  adr/               — Architecture Decision Records
  specs/             — OpenAPI specs
  rest-conventions.md
  go-best-practices.md
  testing-strategy.md
```

## Quick Start

```bash
# Run the server
make run

# Run tests
make test

# Lint
make lint
```

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Health check |

## Roadmap

### Phase 1 (current) — Foundation
- Framework selection (Gin), health endpoint, docs, conventions

### Phase 2 — Stub endpoints
- Copy OpenAPI spec, replicate endpoints with dummy responses

### Phase 3 — API migration
- Implement real API logic, migrate SQLite table to DuckDB for NAV data
