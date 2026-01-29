# Product Requirements Document (PRD): TODO API

## 1. Project Overview

The TODO API is a backend RESTful service designed to manage personal and shared tasks. It provides a structured way to handle task lifecycles, ensuring data persistence via a `PostgreSQL` database and strict data validation using `Pydantic`.

## 2. Objective

To provide a robust, scalable API that allows users to perform `CRUD` (Create, Read, Update, Delete) operations on tasks while maintaining audit trails (timestamps) and preparing for future collaborative features.

## 3. Functional Requirements

### 3.1 Core CRUD Operations

| Feature       | Description                                                    |
| :------------ | :------------------------------------------------------------- |
| Create Task   | Add a new task with a title, description, and creator info.    |
| Read Tasks    | List all tasks or fetch a single task by its unique ID.        |
| Update Task   | Modify title, description, completion status, or other metadata. |
| Delete Task   | Permanently remove a task from the database.                   |

### 3.2 Audit & Metadata

Each task must track:

*   **Creation Timestamp**: When the task was first initialized.
*   **Update Timestamp**: The last time any field in the task was modified.
*   **Creator ID**: A reference to who created the task (to support future multi-user logic).

## 4. Data Schema (Essential Fields)

*   `id` (Integer): Primary key, auto-incrementing.
*   `title` (String): Maximum 255 characters. Required.
*   `description` (Text): Detailed notes about the task. Optional.
*   `is_completed` (Boolean): Current status. Default: `false`.
*   `created_by` (String/UUID): The identifier of the user who created the task.
*   `created_at` (DateTime): Timestamp with timezone.
*   `updated_at` (DateTime): Timestamp with timezone.

## 5. Future Extensibility (Out of Scope for V1)

The architecture must be designed to eventually support:

*   **Todo Lists**: Grouping multiple tasks into a named list (e.g., "Work," "Groceries").
*   **Sharing**: Granting other users permission to view or edit specific tasks or lists.
*   **Task Nesting**: Sub-tasks within a main TODO item.

## 6. Technical Constraints

*   **Framework**: `FastAPI` (Python).
*   **ORM**: `SQLAlchemy`.
*   **Validation**: `Pydantic`.
*   **Database**: `PostgreSQL`.
*   **Authentication**: Currently ignored, but `created_by` is included to ease future integration.

## 7. Success Metrics

*   **Validation Accuracy**: 100% of malformed requests (e.g., missing title) should return a `422 Unprocessable Entity` error.
*   **Data Integrity**: `updated_at` must automatically refresh on every `PUT` or `PATCH` operation.