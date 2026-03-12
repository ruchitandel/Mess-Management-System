# backend/routes/dashboard.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from auth import require_role
from services.dashboard_service import get_dashboard_overview

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/overview")
def dashboard_overview(
    db: Session = Depends(get_db),
    current_user = Depends(require_role(1))  # 1 = Admin
):
    return get_dashboard_overview(db)