# **Project Blueprint: Spec-Driven Fullstack App**

## **Tech Stack**

* **Backend**: Python 3.12+, FastAPI, SQLAlchemy 2.0 (Async), Pydantic v2, Alembic, uv.  
* **Frontend**: React, Vite, React Router, Tailwind CSS, Playwright, pnpm.  
* **Infrastructure**: Docker Compose (Local Postgres/pgAdmin), Supabase Auth.  
* **Methodology**: Spec-Driven Development, TDD, Layered Architecture.

## **Directory Structure**

.  
├── backend/                \# FastAPI Application  
│   ├── alembic/            \# Database migrations  
│   ├── src/  
│   │   ├── api/            \# Route handlers  
│   │   ├── services/       \# Business logic layer  
│   │   ├── repositories/   \# Database abstraction layer  
│   │   ├── models/         \# SQLAlchemy ORM models  
│   │   ├── schemas/        \# Pydantic models (generated from Spec)  
│   │   ├── core/           \# Config, Supabase Auth middleware  
│   │   └── main.py         \# App entry  
│   ├── tests/              \# Pytest suite  
│   ├── alembic.ini  
│   └── pyproject.toml      \# uv configuration  
├── frontend/               \# React Application  
│   ├── src/  
│   │   ├── api/            \# Generated API client  
│   │   ├── components/       
│   │   ├── pages/  
│   │   └── hooks/          \# Auth and Data fetching  
│   ├── tests/              \# Playwright E2E tests  
│   └── package.json  
├── specs/                  \# Shared Source of Truth  
│   └── openapi.yaml        \# API Specification  
├── docs/                   \# Documentation Root  
│   ├── setup/  
│   │   └── environment.md  \# Environment Setup Guide  
│   └── features/             
│       ├── prd.md          \# Product Requirements Document  
│       └── onboarding.md   \# Feature implementation doc  
├── docker-compose.yml      \# Local infrastructure (Postgres, pgAdmin)  
└── README.md               \# Root orchestration guide

## **Phase 1: Foundation & API Specification**

### **Step 1: Environment Setup**

1. **Infrastructure**: Deploy docker-compose.yml for local development.  
2. **Backend**: Initialize with uv sync and configure .env based on docs/setup/environment.md.  
3. **Frontend**: Initialize with pnpm create vite and configure .env.

### **Step 2: Multi-Tenant Architecture**

* **Tenant Isolation**: Mandatory tenant\_id in all domain models.  
* **RBAC**: Implement logic for SUPER\_ADMIN, TENANT\_ADMIN, EDITOR, VIEWER.

### **Step 3: OpenAPI Definition**

Draft specs/openapi.yaml to define the contract for tenants, users, and todos.

## **Phase 2: Implementation Workflow**

1. **Schema Generation**: OpenAPI to Pydantic.  
2. **Migrations**: SQLAlchemy models to Alembic revisions.  
3. **Layered Implementation**: Repository \-\> Service \-\> Route.  
4. **Validation**: Pytest for backend and Playwright for frontend.
