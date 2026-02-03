from uuid import UUID, uuid4

from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.core.database import Base


class Todo(Base):
    __tablename__ = "todos"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)
    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id"), nullable=False)
    tenant_id: Mapped[UUID] = mapped_column(ForeignKey("tenants.id"), nullable=False)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="todos")
    tenant: Mapped["Tenant"] = relationship(back_populates="todos")


from src.models.user import User
from src.models.tenant import Tenant
