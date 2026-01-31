# **Developer Environment Setup**

## **Prerequisites**

* **Operating System**: macOS (Intel or Apple Silicon).  
* **Node.js**: Managed via `nvm`.  
* **Python**: 3.12+ managed via `uv`.  
* **Package Managers**: `pnpm` (Frontend) and `uv` (Backend).  
* **Docker & Docker Compose**: For local infrastructure orchestration.

## **1\. Global Tooling Setup**

### **NVM (Node Version Manager)**

Used to manage Node.js versions.

* **Install**: Follow instructions at [nvm-sh/nvm](https://github.com/nvm-sh/nvm).

**Usage**:  
nvm install 20

nvm use 20

* 

### **pnpm**

**Install**:  
npm install \-g pnpm

*   
* **Commands**:  
  * `pnpm install`: Install dependencies.  
  * `pnpm dev`: Start Vite development server.

### **uv**

**Install**:  
curl \-LsSf \[https://astral.sh/uv/install.sh\](https://astral.sh/uv/install.sh) | sh

*   
* **Commands**:  
  * `uv sync`: Install and sync dependencies.  
  * `uv run <cmd>`: Run command in virtual environment.

## **2\. Infrastructure (Docker Compose)**

Run the local database and management tools from the root directory.

**Start Services**:  
docker-compose up \-d

1.   
2. **Services Included**:  
   * **Postgres**: Accessible at `localhost:5432`.  
   * **pgAdmin** (Optional): UI for database management at `localhost:5050`.

## **3\. Backend Setup (FastAPI)**

Navigate to `/backend`.

**Initialize**:  
uv sync

1. 

**Environment Configuration**: Create `.env`. The application is database-agnostic; point to a local Docker container or a remote Supabase DB.  
\# For Local Docker

DATABASE\_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/app\_db

\# For Supabase DB

\# DATABASE\_URL=postgresql+asyncpg://postgres:\[PASSWORD\]@db.\[REF\].supabase.co:5432/postgres

SUPABASE\_JWT\_SECRET=your\_supabase\_project\_jwt\_secret

2. 

**Migrations**:  
uv run alembic upgrade head

3. 

**Run Server**:  
uv run fastapi dev src/main.py

4. 

## **4\. Frontend Setup (React/Vite)**

Navigate to `/frontend`.

**Install**:  
pnpm install

1. 

**Environment Configuration**: Create `.env`.  
VITE\_API\_URL=http://localhost:8000

VITE\_SUPABASE\_URL=https://\[PROJECT\_ID\].supabase.co

VITE\_SUPABASE\_ANON\_KEY=your\_anon\_key

2. 

**Run**:  
pnpm dev

3. 

## **5\. API Client Generation**

When `specs/openapi.yaml` changes, regenerate the frontend client:

cd frontend

pnpm run generate-client
