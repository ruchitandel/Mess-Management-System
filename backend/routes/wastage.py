from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from auth import require_role
from schemas.wastage import WastageCreate, WastageResponse
from services.wastage_service import create_wastage, get_monthly_wastage
from datetime import date

router = APIRouter(prefix="/wastage", tags=["Wastage"])


@router.post("/", response_model=WastageResponse,
             dependencies=[Depends(require_role(1))])
def add_wastage(
    data: WastageCreate,
    db: Session = Depends(get_db)
):
    return create_wastage(db, data)


@router.get("/month", response_model=list[WastageResponse],
            dependencies=[Depends(require_role(1))])
def wastage_by_month(
    month: date,
    db: Session = Depends(get_db)
):
    return get_monthly_wastage(db, month)
