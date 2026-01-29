# TODO API Technical Implementation Plan

## 1. System Architecture

The application follows a layered architecture within a `src` package directory to separate source code from configuration and documentation.

*   **FastAPI Layer**: Handles HTTP routing and documentation.
*   **Pydantic Layer**: Handles data validation and serialization.
*   **SQLAlchemy Layer**: Manages ORM models and DB sessions.
*   **PostgreSQL Layer**: Persistent storage.

## 2. Project Structure

We are using the `src` layout. All project documentation is stored in the `docs/` folder.

```
todo_project/
├── docs/ # Project Documentation
│   ├── prd_todo_api.md
│   ├── api_spec.yaml
│   └── technical_implementation.md
├── src/
│   └── todo_app/ # Source code directory
│       ├── __init__.py
│       ├── main.py # FastAPI app initialization
│       ├── database.py # SQLAlchemy setup
│       ├── models.py # DB Models
│       ├── schemas.py # Pydantic Schemas
│       └── crud.py # DB Operations
├── tests/ # Test suite
├── .env # Environment variables
├── .gitignore # Git exclusions
├── requirements.txt # Dependencies
└── pyproject.toml # Build system configuration
```

## 3. Database Design (SQLAlchemy)

*   **Automatic Timestamps**: Use `server_default=func.now()` for `created_at` and `onupdate=func.now()` for `updated_at`.
*   **Audit Field**: `created_by` will be stored as a `String` (representing a User ID).

## 4. Data Validation (Pydantic)

Three primary schemas will be implemented:

*   **TodoBase**: Shared attributes.
*   **TodoCreate**: Input validation (requires `created_by`).
*   **TodoResponse**: Output serialization (sets `from_attributes = True`).

## 5. Development Steps

### Step 1: Environment Setup

1.  Create virtual environment and install: `fastapi`, `uvicorn`, `sqlalchemy`, `psycopg2-binary`.
2.  Define `DATABASE_URL` in `.env`.

### Step 2: Persistence Layer

1.  Define the `Todo` class in `src/todo_app/models.py`.
2.  Implement `SessionLocal` and `get_db` dependency in `src/todo_app/database.py`.

### Step 3: CRUD Logic

1.  Implement functions in `src/todo_app/crud.py` to decouple DB queries from route handlers.

### Step 4: API Endpoints

1.  Initialize FastAPI in `src/todo_app/main.py`.
2.  Run the app using: `uvicorn todo_app.main:app --reload` (ensuring `src` is in `PYTHONPATH`).

## 6. Implementation Logic for Audit Fields

*   `created_at`: Handled by Postgres `DEFAULT`.
*   `updated_at`: Handled by SQLAlchemy `onupdate`.
*   `created_by`: Passed via Pydantic model during the `POST` request.