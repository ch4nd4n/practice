# Getting Started

## Run a CLI

From repository root:

- `go run ./cmd/<cli>`

Example:

- `go run ./cmd/hello`

## Build a CLI

- `go build -o bin/<cli> ./cmd/<cli>`

Example:

- `go build -o bin/hello ./cmd/hello`
- `./bin/hello`

## Test and build all packages

- `make test`
- `make build`

## Add a new CLI

1. Add entrypoint: `cmd/<new-cli>/main.go`
2. Add logic package: `internal/<domain>/`
3. Add specs:
   - `specs/<new-cli>/PRD.md`
   - `specs/<new-cli>/SPEC.md`
   - `specs/<new-cli>/ACCEPTANCE_TESTS.md`
