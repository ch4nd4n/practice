# Frontend: React & Vite

## Setup

1. Run `pnpm install`.
2. Configure `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Development Flow

- **Run**: `pnpm dev`
- **E2E Tests**: `pnpm exec playwright test`

## Rules

- Use generated API clients from the backend spec.
- All routes protected by Supabase Auth guards.
