# REST API Conventions

## URL Structure
- Base path: `/api/v1`
- Resource names are plural nouns in kebab-case: `/api/v1/financial-statements`
- Nested resources: `/api/v1/companies/:companyId/filings`
- No trailing slashes

## Versioning
- Version in URL path (`/api/v1/...`)
- Bump major version only for breaking changes

## HTTP Methods
| Method | Usage |
|--------|-------|
| GET | Read resource(s) |
| POST | Create resource |
| PUT | Full replace |
| PATCH | Partial update |
| DELETE | Remove resource |

## Status Codes
| Code | Usage |
|------|-------|
| 200 | Success with body |
| 201 | Resource created |
| 204 | Success, no body (DELETE) |
| 400 | Validation / bad request |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict |
| 500 | Internal server error |

## Error Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description",
    "details": []
  }
}
```

## Pagination
Use cursor-based pagination for list endpoints:
```
GET /api/v1/companies?cursor=abc123&limit=25
```
Response includes:
```json
{
  "data": [],
  "pagination": {
    "next_cursor": "def456",
    "has_more": true
  }
}
```

## Naming
- JSON fields: `snake_case`
- Query params: `snake_case`
- Path params: `camelCase` (Go convention for URL params)
