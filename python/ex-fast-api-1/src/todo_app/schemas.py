from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Optional
from uuid import UUID

class TodoBase(BaseModel):
    """
    Base schema for TODO items containing shared attributes.
    """
    title: str = Field(..., max_length=255, description="The title of the todo item")
    description: Optional[str] = Field(None, description="Optional detailed description")
    is_completed: bool = Field(default=False, description="Completion status of the task")
    created_by: str = Field(..., description="Identifier for the user who created this task")

class TodoCreate(TodoBase):
    """
    Schema for creating a new TODO item. 
    Inherits all fields from TodoBase.
    """
    pass

class TodoUpdate(BaseModel):
    """
    Schema for updating an existing TODO item.
    All fields are optional to allow for partial updates (PATCH style).
    """
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    is_completed: Optional[bool] = None

class TodoResponse(TodoBase):
    """
    Schema for the response body returned to the client.
    Includes database-generated fields.
    """
    id: int
    created_at: datetime
    updated_at: datetime

    # This configuration allows Pydantic to interface with SQLAlchemy ORM models
    model_config = ConfigDict(from_attributes=True)