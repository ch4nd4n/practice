# ADR-001: Use Gin as the HTTP framework

## Status
Accepted

## Context
We are migrating the Finark core API from Fastify/TypeScript to Go. We need an HTTP framework that provides routing, middleware, JSON serialization, and validation with minimal boilerplate.

## Options Considered
- **net/http (stdlib)** — Maximum control, no dependencies. Requires manual routing, middleware chaining, and parameter extraction.
- **Gin** — Most popular Go web framework. Fast radix-tree router, built-in middleware, JSON binding/validation, large ecosystem.
- **Echo** — Similar feature set to Gin, slightly smaller community.
- **Chi** — Lightweight, stdlib-compatible router. Less opinionated than Gin.

## Decision
Use **Gin** because:
1. Mature and battle-tested (70k+ GitHub stars, used in production by many companies).
2. Built-in binding and validation via `go-playground/validator` reduces boilerplate.
3. Middleware ecosystem covers logging, CORS, auth, rate limiting out of the box.
4. Performance is excellent — radix tree router with zero-allocation path parsing.
5. Team familiarity — Gin's API is well-documented and easy to onboard to.

## Consequences
- We take on Gin as a dependency (and its transitive deps).
- Handlers use `*gin.Context` instead of stdlib `http.ResponseWriter`/`*http.Request`, which couples handler signatures to the framework. We mitigate this by keeping business logic in the `service` layer.
