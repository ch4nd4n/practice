from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.database import Base


class Tenant(Base):
    __tablename__ = "tenants"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    # Relationships
    users: Mapped[list["User"]] = relationship(back_populates="tenant")
    todos: Mapped[list["Todo"]] = relationship(back_populates="tenant")


from src.models.user import User
from src.models.todo import Todo
