# Architecture

- `cmd/<cli>/main.go`: CLI entrypoints and argument wiring.
- `internal/<domain>/`: business logic and integrations.
- `specs/<cli>/`: product + behavior specs and acceptance scenarios.
- `testdata/`: fixtures for tests.

## Why this structure
- Supports multiple CLIs in one module.
- Keeps command parsing separate from domain logic.
- Keeps implementation anchored to spec artifacts.
