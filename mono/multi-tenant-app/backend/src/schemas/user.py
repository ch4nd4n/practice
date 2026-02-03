from uuid import UUID

from pydantic import BaseModel, EmailStr

from src.core.auth import Role


class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    role: Role
    tenant_id: UUID

    model_config = {"from_attributes": True}
