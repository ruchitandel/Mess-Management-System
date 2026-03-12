from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.billing import Billing
from models.user import User

router = APIRouter(
    prefix="/staff-billing",
    tags=["Staff Billing"]
)


@router.get("/")
def get_all_billing(db: Session = Depends(get_db)):

    bills = (
        db.query(
            Billing.id,
            User.name.label("student_name"),
            Billing.total_meals,
            Billing.bill_amount,
            Billing.payment_status
        )
        .join(User, User.id == Billing.student_id)
        .all()
    )

    return [
        {
            "id": b.id,
            "student_name": b.student_name,
            "total_meals": b.total_meals,
            "bill_amount": b.bill_amount,
            "status": b.payment_status
        }
        for b in bills
    ]