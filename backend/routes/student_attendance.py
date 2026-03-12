from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import get_db
from models.attendance import Attendance
from models.student import Student

router = APIRouter(
    prefix="/student-attendance",
    tags=["Student Attendance"]
)


@router.get("/{student_id}")
def get_student_attendance(student_id: int, db: Session = Depends(get_db)):

    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        return {"message": "Student not found"}

    attendance = db.query(Attendance).filter(
        Attendance.user_id == student.user_id
    ).all()

    return attendance