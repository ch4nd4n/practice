# TODO API

A RESTful backend built with FastAPI for managing tasks.

## Features

- Full CRUD operations for tasks (create, read, update, delete)
- Automatic timestamp tracking (`created_at`, `updated_at`)
- Data validation with Pydantic
- SQLite database with SQLAlchemy ORM

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/todos/` | Create a task |
| GET | `/todos/` | List all tasks |
| GET | `/todos/{id}` | Get a specific task |
| PATCH | `/todos/{id}` | Update a task |
| DELETE | `/todos/{id}` | Delete a task |

## Project Structure

```
src/todo_app/
├── main.py       # FastAPI app & routes
├── models.py     # SQLAlchemy Todo model
├── schemas.py    # Pydantic validation schemas
├── database.py   # DB connection setup
└── crud.py       # Database operations
```

## Tech Stack

- FastAPI 0.127.0
- SQLAlchemy 2.0.45
- Pydantic 2.x
- SQLite (dev) / PostgreSQL (prod)
- Python 3.13

## Getting Started

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the server:
   ```bash
   uvicorn src.todo_app.main:app --reload
   ```

3. Open API docs at http://localhost:8000/docs
