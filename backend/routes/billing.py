from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_user, require_role
from schemas.billing import BillingCreate, BillingResponse
from services.billing_service import (
    generate_monthly_bill,
    pay_bill,
    get_my_bills,
    get_monthly_summary,
    get_all_bills
)

from models.user import User
from datetime import date

router = APIRouter(prefix="/billing", tags=["Billing"])


# STUDENT: Generate Bill
@router.post("/generate", response_model=BillingResponse)
def generate_bill(
    data: BillingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return generate_monthly_bill(db, current_user.id, data.month)


# ADMIN: PAY BILL
@router.put("/pay/{billing_id}", response_model=BillingResponse)
def pay_bill_route(
    billing_id: int,
    payment_mode: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(1))
):

    return pay_bill(db, billing_id, payment_mode)


# STUDENT: GET MY BILLS
@router.get("/my", response_model=list[BillingResponse])
def get_my_bills_route(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return get_my_bills(db, current_user.id)


# ADMIN: GET ALL BILLS
@router.get("/", dependencies=[Depends(require_role(1))])
def get_all_bills_route(db: Session = Depends(get_db)):

    return get_all_bills(db)


# ADMIN: MONTHLY SUMMARY
@router.get("/summary")
def billing_summary(
    month: date,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(1))
):

    return get_monthly_summary(db, month)