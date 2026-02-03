from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.models import Tenant


class TenantRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, name: str) -> Tenant:
        tenant = Tenant(name=name)
        self.session.add(tenant)
        await self.session.flush()
        return tenant

    async def get_by_id(self, tenant_id: UUID) -> Tenant | None:
        result = await self.session.execute(
            select(Tenant).where(Tenant.id == tenant_id)
        )
        return result.scalar_one_or_none()
