from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db

from models.attendance import Attendance
from models.user import User
from models.meal import Meal

router = APIRouter(
    prefix="/staff-attendance",
    tags=["Staff Attendance"]
)


@router.get("/")
def get_all_attendance(db: Session = Depends(get_db)):

    records = (
        db.query(
            Attendance.id,
            User.name.label("student_name"),
            Meal.name.label("meal_name"),
            Attendance.date
        )
        .join(User, User.id == Attendance.user_id)
        .join(Meal, Meal.id == Attendance.meal_id)
        .all()
    )

    return [
        {
            "id": r.id,
            "student_name": r.student_name,
            "meal_name": r.meal_name,
            "date": r.date
        }
        for r in records
    ]