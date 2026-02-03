from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.models import Todo


class TodoRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(
        self, title: str, user_id: UUID, tenant_id: UUID
    ) -> Todo:
        todo = Todo(title=title, user_id=user_id, tenant_id=tenant_id)
        self.session.add(todo)
        await self.session.flush()
        return todo

    async def list_by_tenant(self, tenant_id: UUID) -> list[Todo]:
        result = await self.session.execute(
            select(Todo).where(Todo.tenant_id == tenant_id)
        )
        return list(result.scalars().all())

    async def get_by_id(self, todo_id: UUID, tenant_id: UUID) -> Todo | None:
        result = await self.session.execute(
            select(Todo).where(Todo.id == todo_id, Todo.tenant_id == tenant_id)
        )
        return result.scalar_one_or_none()
