# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A spec-driven, multi-tenant Todo SaaS application with RBAC. Super Admin manages tenants; tenants manage their own users and tasks.

## Monorepo Structure

```
├── backend/          # FastAPI + SQLAlchemy (see backend/CLAUDE.md)
├── frontend/         # React + Vite + Tailwind (placeholder)
├── specs/spec.yml    # OpenAPI 3.0 spec (source of truth)
├── docs/             # Documentation
│   ├── setup/environment.md    # Tooling setup guide
│   └── features/prd.md         # Product requirements & user stories
└── docker-compose.yml          # Local Postgres + pgAdmin
```

## Quick Start

```bash
# Start infrastructure (from root)
docker compose up -d    # Postgres:5432, pgAdmin:5050

# Backend
cd backend
uv sync
uv run alembic upgrade head
uv run uvicorn src.main:app --reload    # http://localhost:8000

# Frontend (when implemented)
cd frontend
pnpm install
pnpm dev    # http://localhost:5173
```

## Development Workflow

1. **Spec-first**: Changes start in `specs/spec.yml`
2. **Generate clients**: `pnpm run generate-client` in frontend after spec changes
3. **Layered implementation**: Repository → Service → Route
4. **Test**: Backend with pytest, Frontend with Playwright

## Roles & Permissions (from PRD)

| Role | Scope | Permissions |
|------|-------|-------------|
| SUPER_ADMIN | Global | Create/delete tenants, create tenant admins |
| TENANT_ADMIN | Tenant | Manage users, create/assign todos to any user |
| EDITOR | Tenant | Create/edit/delete any todo in tenant |
| VIEWER | Tenant | View-only access to tenant todos |
| USER | Tenant | CRUD own todos only |

## Key Documentation

- `docs/setup/environment.md` - Prerequisites (nvm, pnpm, uv, Docker)
- `docs/features/prd.md` - Full requirements and user stories
- `backend/CLAUDE.md` - Backend-specific architecture and commands
