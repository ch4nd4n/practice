from uuid import UUID

from pydantic import BaseModel


class TodoCreate(BaseModel):
    title: str
    user_id: UUID | None = None  # Optional: target user (Admin/Editor only)


class TodoResponse(BaseModel):
    id: UUID
    title: str
    completed: bool
    user_id: UUID
    tenant_id: UUID

    model_config = {"from_attributes": True}
