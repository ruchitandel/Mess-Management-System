from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.billing import Billing
from models.student import Student

router = APIRouter(
    prefix="/student-billing",
    tags=["Student Billing"]
)


@router.get("/{student_id}")
def get_student_billing(student_id: int, db: Session = Depends(get_db)):

    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        return {"message": "Student not found"}

    bills = db.query(Billing).filter(
        Billing.student_id == student_id
    ).all()

    return bills