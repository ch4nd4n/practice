# Go Best Practices

## Project Layout
```
cmd/server/       — Entry point
internal/handler/ — HTTP handlers (thin, delegate to services)
internal/service/ — Business logic
internal/repository/ — Data access (DB queries)
internal/model/   — Domain structs and DTOs
```

`internal/` prevents external imports — all application code lives here.

## Error Handling
- Return errors, don't panic. Reserve `panic` for truly unrecoverable states.
- Wrap errors with context: `fmt.Errorf("fetch company %s: %w", id, err)`
- Use sentinel errors or custom types for errors that callers need to match on.
- Handlers translate service errors to HTTP status codes.

## Naming
- Packages: short, lowercase, single word when possible (`handler`, not `handlers`).
- Interfaces: describe behavior (`Reader`, `CompanyFinder`), not the implementation.
- Unexported by default — only export what other packages need.

## Dependency Injection
- Pass dependencies as constructor arguments, not globals.
- Define interfaces in the **consumer** package, not the provider.
- Wire everything in `cmd/server/main.go`.

## Linting
- Use `golangci-lint` with default config.
- Run via `make lint`.

## Dependencies
- Prefer stdlib where reasonable.
- Pin dependencies with `go.sum`.
- Review transitive deps before adding new libraries.
