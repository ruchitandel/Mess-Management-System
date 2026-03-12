from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import get_db
from models.student import Student
from models.user import User
from models.attendance import Attendance
from models.billing import Billing

router = APIRouter(
    prefix="/student-dashboard",
    tags=["Student Dashboard"]
)


@router.get("/{student_id}")
def get_student_dashboard(student_id: int, db: Session = Depends(get_db)):

    # ================= FIND STUDENT =================

    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # ================= GET USER =================

    user = db.query(User).filter(User.id == student.user_id).first()

    # ================= ATTENDANCE =================

    attendance_days = (
        db.query(func.count(Attendance.id))
        .filter(Attendance.user_id == student.user_id)
        .scalar()
    )

    if attendance_days is None:
        attendance_days = 0

    # ================= BILLING =================

    bill = db.query(Billing).filter(Billing.student_id == student_id).first()

    total_bill = 0
    payment_status = "Pending"

    if bill:
        total_bill = bill.bill_amount
        payment_status = bill.payment_status

    # ================= RESPONSE =================

    return {
        "student_id": student.id,
        "name": user.name if user else "Unknown",
        "attendance_days": attendance_days,
        "total_bill": total_bill,
        "status": payment_status
    }