# Developer Environment Setup

## Prerequisites

- **Operating System**: macOS (Intel or Apple Silicon)
- **Node.js**: Managed via `nvm`
- **Python**: 3.12+ managed via `uv`
- **Package Managers**: `pnpm` (Frontend) and `uv` (Backend)
- **Docker & Docker Compose**: For local infrastructure orchestration

## 1. Global Tooling Setup

### NVM (Node Version Manager)

Used to manage Node.js versions.

- **Install**: Follow instructions at [nvm-sh/nvm](https://github.com/nvm-sh/nvm)

**Usage**:

```bash
nvm install 20
nvm use 20
```

### pnpm

**Install**:

```bash
npm install -g pnpm
```

**Commands**:

- `pnpm install`: Install dependencies
- `pnpm dev`: Start Vite development server

### uv

**Install**:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Commands**:

- `uv sync`: Install and sync dependencies
- `uv run <cmd>`: Run command in virtual environment

## 2. Infrastructure (Docker Compose)

Run the local database and management tools from the root directory.

**Start Services**:

```bash
docker compose up -d
```

**Services Included**:

- **Postgres**: Accessible at `localhost:5432`
- **pgAdmin** (Optional): UI for database management at `localhost:5050`

## 3. Backend Setup (FastAPI)

Navigate to `/backend`.

1. **Initialize**:

   ```bash
   uv sync
   ```

2. **Environment Configuration**: Create `.env`. The application is database-agnostic; point to a local Docker container or a remote Supabase DB.

   ```bash
   # For Local Docker
   DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/app_db

   # For Supabase DB
   # DATABASE_URL=postgresql+asyncpg://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres

   SUPABASE_JWT_SECRET=your_supabase_project_jwt_secret
   ```

3. **Migrations**:

   ```bash
   uv run alembic upgrade head
   ```

4. **Run Server**:

   ```bash
   uv run uvicorn src.main:app --reload
   ```

## 4. Frontend Setup (React/Vite)

Navigate to `/frontend`.

1. **Install**:

   ```bash
   pnpm install
   ```

2. **Environment Configuration**: Create `.env`.

   ```bash
   VITE_API_URL=http://localhost:8000
   VITE_SUPABASE_URL=https://[PROJECT_ID].supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Run**:

   ```bash
   pnpm dev
   ```

## 5. API Client Generation

When `specs/openapi.yaml` changes, regenerate the frontend client:

```bash
cd frontend
pnpm run generate-client
```
