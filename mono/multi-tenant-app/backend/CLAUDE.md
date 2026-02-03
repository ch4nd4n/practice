# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Install dependencies (including dev: pytest, ruff)
uv sync

# Start local Postgres (from parent directory)
docker compose -f ../docker-compose.yml up -d

# Run development server
uv run uvicorn src.main:app --reload

# Database migrations
uv run alembic upgrade head
uv run alembic revision --autogenerate -m "Description"

# Testing (async-aware via asyncio_mode="auto")
pytest
pytest tests/test_file.py           # single file
pytest -k test_name                 # by test name

# Linting
ruff check src/
ruff format src/
```

## Architecture

This is a **spec-driven, multi-tenant SaaS backend** using FastAPI + SQLAlchemy 2.0 (async) + Pydantic v2.

### Layered Architecture (Enforced)

```
Routes (api/) → Services (services/) → Repositories (repositories/) → Models (models/)
```

**Critical Rules:**
- Routes must NOT touch the DB directly; they call Services
- Services must NOT write SQL; they call Repositories
- Schemas must align with `../specs/spec.yml`

### Multi-Tenancy

- All domain tables (users, todos) have mandatory `tenant_id` foreign key
- Always filter queries by `tenant_id` to prevent data leakage
- Validate `tenant_id` from JWT claims

### Authentication (src/core/auth.py)

- Supabase JWT auth via HTTP Bearer
- Roles: `SUPER_ADMIN`, `TENANT_ADMIN`, `EDITOR`, `VIEWER`
- JWT claims: `sub` (user ID), `email`, `user_metadata.role`, `user_metadata.tenant_id`

### Database Models (src/models/)

- `Tenant`: id, name, created_at
- `User`: id, email, role, tenant_id (FK)
- `Todo`: id, title, completed, user_id (FK), tenant_id (FK)

## Configuration

- Python 3.12+ required
- Environment: `.env` with `DATABASE_URL`, `SUPABASE_JWT_SECRET`
- Database: PostgreSQL via `asyncpg` driver
- Local infra: `docker compose up -d` (Postgres on 5432, pgAdmin on 5050)

## Key Files

- `src/main.py` - FastAPI app entry point
- `src/core/config.py` - Pydantic Settings
- `src/core/database.py` - SQLAlchemy async engine & session factory
- `../specs/spec.yml` - API specification (source of truth)

## Current State

Models, schemas, and repositories are implemented. Services (`src/services/`) and routes (`src/api/`) are empty stubs awaiting implementation.
