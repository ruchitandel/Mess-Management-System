from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import get_db
from models.student import Student
from models.attendance import Attendance
from models.billing import Billing

router = APIRouter(
    prefix="/staff-dashboard",
    tags=["Staff Dashboard"]
)


@router.get("/")
def get_staff_dashboard(db: Session = Depends(get_db)):

    total_students = db.query(func.count(Student.id)).scalar()

    total_attendance = db.query(func.count(Attendance.id)).scalar()

    pending_bills = db.query(func.count(Billing.id)).filter(
        Billing.payment_status == "Pending"
    ).scalar()

    return {
        "total_students": total_students,
        "total_attendance": total_attendance,
        "pending_bills": pending_bills
    }