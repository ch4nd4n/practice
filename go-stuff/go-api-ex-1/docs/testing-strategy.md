# Testing Strategy

## Test Pyramid

### Unit Tests (majority)
- Test individual functions and methods in isolation.
- Mock external dependencies (DB, HTTP clients) using interfaces.
- Files: `*_test.go` next to the code they test.

### Integration Tests
- Test handler → service → repository with a real (test) database.
- Use build tags (`//go:build integration`) to separate from unit tests.
- Run via `make test-integration` (when DB is available).

### What to Test Per Layer

| Layer | What to test | What to mock |
|-------|-------------|--------------|
| Handler | HTTP status, response shape, input validation | Service |
| Service | Business rules, edge cases, error mapping | Repository |
| Repository | Queries return correct data, handle missing rows | Nothing (use test DB) |

## Tooling
- `testing` stdlib for all tests.
- `net/http/httptest` for handler tests.
- `gin.TestMode` to suppress debug logs in tests.
- Table-driven tests for functions with multiple input/output cases.

## Conventions
- Test function names: `TestFunctionName` or `TestFunctionName_scenario`.
- Use `t.Helper()` in test utilities.
- Use `t.Parallel()` where tests are independent.
- Fail fast with `t.Fatal` for setup errors, `t.Error` for assertion failures.
