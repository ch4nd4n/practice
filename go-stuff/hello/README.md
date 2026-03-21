# Go CLI Playground

This repository is structured for **spec-driven development** of multiple Go CLIs.

## Getting Started
- From repo root, run a CLI without building:
  - `go run ./cmd/<cli>`
- Example:
  - `go run ./cmd/hello`
- Build a specific CLI binary:
  - `go build -o bin/<cli> ./cmd/<cli>`
- Example:
  - `go build -o bin/hello ./cmd/hello && ./bin/hello`

## Current CLIs
- `hello`: minimal working CLI (`cmd/hello/main.go`)

## Planned CLIs
- `downloader-cli`: download files from the internet safely/reliably
- `pg-fund-cli`: query Postgres for fund/search workflows

## Development Flow
1. Write `specs/<cli>/PRD.md`
2. Write `specs/<cli>/SPEC.md`
3. Write `specs/<cli>/ACCEPTANCE_TESTS.md`
4. Implement logic in `internal/<cli>/`
5. Wire executable in `cmd/<cli>/main.go`
6. Add tests and keep docs/examples in sync

## Commands
- `make test`
- `make build`
- `make run-hello`

## Documentation
- Basic usage and onboarding: `README.md` (this file)
- Conventions and project structure: `docs/architecture.md`
- CLI requirements/specs: `specs/<cli>/`
