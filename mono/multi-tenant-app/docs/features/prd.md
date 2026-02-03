# Product Requirements Document: Multi-Tenant Todo System

## 1. Executive Summary

A multi-tenant Todo application where a Super Admin manages tenants, and tenants manage their own users and tasks with role-based access control (RBAC).

## 2. User Roles & Permissions

| Role | Scope | Permissions |
|------|-------|-------------|
| **Super Admin** | Global | Create/Delete Tenants; Create Tenant Admins. |
| **Tenant Admin** | Tenant | Create/Manage Tenant Users; Create Todos for any user in tenant; Manage all Tenant Todos. |
| **Editor** | Tenant | Create/Edit/Delete any Todo within the tenant. |
| **Viewer** | Tenant | View all Todos within the tenant; No edit/create permissions. |
| **User (Standard)** | Tenant | Create/Edit/Delete own Todos; View own Todos. |

## 3. Functional Requirements

### 3.1 Tenant Management (Super Admin)

- Create a new Tenant entity (Name, ID).
- Provision the first User for a Tenant and assign the `TENANT_ADMIN` role.

### 3.2 User Management (Tenant Admin)

- Invite or create new Users within their specific Tenant.
- Assign roles (`EDITOR`, `VIEWER`, `USER`) to Tenant Users.

### 3.3 Todo Management

- **Creation**: Users can create Todos with a title and status.
- **Assignment**: Tenant Admins can create a Todo and assign it to a specific User ID within the same tenant.
- **Isolation**: Users must never see Todos belonging to a different `tenant_id`.
- **RBAC Enforcement**:
  - `VIEWER` can only perform GET requests.
  - `EDITOR` can modify any Todo in the tenant.
  - `USER` can only modify Todos where `user_id == current_user_id`.

## 4. Technical Constraints

- **Multi-Tenancy**: All database rows must include a `tenant_id`.
- **Authentication**: Handled via Supabase Auth (JWT).
- **Authorization**: Backend must validate the `tenant_id` and `role` from the JWT or the database before executing any service logic.
- **Data Integrity**: Foreign key constraints must link Todos to both a User and a Tenant.

## 5. User Stories

- **US1**: As a Super Admin, I want to create "Company A" so they can start using the platform.
- **US2**: As a Tenant Admin of "Company A", I want to add "User B" as an Editor.
- **US3**: As a Tenant Admin, I want to create a task "Finish Report" and assign it to "User B".
- **US4**: As "User B", I want to login and see only the tasks assigned to me or created by me within "Company A".
