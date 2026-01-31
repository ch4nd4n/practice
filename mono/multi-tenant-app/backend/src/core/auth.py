from enum import Enum
from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from pydantic import BaseModel

from src.core.config import settings

security = HTTPBearer()


class Role(str, Enum):
    SUPER_ADMIN = "SUPER_ADMIN"
    TENANT_ADMIN = "TENANT_ADMIN"
    EDITOR = "EDITOR"
    VIEWER = "VIEWER"


class CurrentUser(BaseModel):
    id: UUID
    email: str
    role: Role
    tenant_id: UUID | None = None  # None for SUPER_ADMIN


def decode_token(token: str) -> dict:
    try:
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated",
        )
        return payload
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {e}",
        )


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> CurrentUser:
    payload = decode_token(credentials.credentials)

    # Extract user metadata from Supabase JWT
    user_metadata = payload.get("user_metadata", {})

    user_id = payload.get("sub")
    email = payload.get("email")
    role = user_metadata.get("role", "VIEWER")
    tenant_id = user_metadata.get("tenant_id")

    if not user_id or not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    return CurrentUser(
        id=UUID(user_id),
        email=email,
        role=Role(role),
        tenant_id=UUID(tenant_id) if tenant_id else None,
    )


def require_roles(*allowed_roles: Role):
    async def role_checker(user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Role {user.role} not authorized. Required: {allowed_roles}",
            )
        return user

    return role_checker
