from uuid import UUID, uuid4

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.auth import Role
from src.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    role: Mapped[Role] = mapped_column(String(50), nullable=False, default=Role.VIEWER)
    tenant_id: Mapped[UUID] = mapped_column(ForeignKey("tenants.id"), nullable=False)

    # Relationships
    tenant: Mapped["Tenant"] = relationship(back_populates="users")
    todos: Mapped[list["Todo"]] = relationship(back_populates="user")


from src.models.tenant import Tenant
from src.models.todo import Todo
