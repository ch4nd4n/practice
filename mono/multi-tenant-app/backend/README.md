# Backend: FastAPI & SQLAlchemy

## Setup

1. Install `uv`.
2. Run `uv sync` to install dependencies.
3. Configure `.env` with `DATABASE_URL` and `SUPABASE_JWT_SECRET`.

## Development Flow

- **Migrations**: `alembic upgrade head`
- **Run**: `uv run uvicorn src.main:app --reload`
- **Test**: `pytest`

## Architectural Rules

- **Routes** must not touch the DB; they call **Services**.
- **Services** must not write SQL; they call **Repositories**.
- **Schemas** must align strictly with `../specs/spec.yml`.
