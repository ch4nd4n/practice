# 0001 - Multi-CLI spec-driven layout

## Status
Accepted

## Context
The repo will host multiple CLIs with distinct domains (network download, Postgres querying, etc.).

## Decision
Use a `cmd/` per executable, `internal/` per domain, and `specs/` per CLI feature.

## Consequences
- Easier independent evolution of tools.
- Clear traceability from PRD/SPEC to implementation/tests.
