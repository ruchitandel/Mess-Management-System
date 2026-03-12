from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date

from database import get_db
from auth import require_role
from schemas.attendance import AttendanceCreate, AttendanceResponse
from services.attendance_service import mark_attendance, get_attendance_by_date

router = APIRouter(prefix="/attendance", tags=["Attendance"])


# ===============================
# ADMIN: MARK ATTENDANCE
# ===============================
@router.post("/", response_model=AttendanceResponse, dependencies=[Depends(require_role(1))])
def create_attendance(
    attendance: AttendanceCreate,
    db: Session = Depends(get_db)
):

    return mark_attendance(
        db=db,
        student_id=attendance.student_id,
        meal_id=attendance.meal_id,
        attendance_date=attendance.date
    )


# ===============================
# GET ATTENDANCE BY DATE
# ===============================
@router.get("/date", dependencies=[Depends(require_role(1))])
def attendance_by_date(
    date: date,
    db: Session = Depends(get_db)
):

    return get_attendance_by_date(db, date)