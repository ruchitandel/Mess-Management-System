from sqlalchemy.orm import Session
from sqlalchemy import and_
from models.attendance import Attendance
from models.student import Student
from fastapi import HTTPException
from datetime import date


def mark_attendance(
    db: Session,
    student_id: int,
    meal_id: int,
    attendance_date: date
):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    existing = db.query(Attendance).filter(
        and_(
            Attendance.student_id == student_id,
            Attendance.meal_id == meal_id,
            Attendance.date == attendance_date
        )
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked"
        )

    attendance = Attendance(
        student_id=student_id,
        meal_id=meal_id,
        date=attendance_date
    )

    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return attendance


def get_attendance_by_date(
    db: Session,
    selected_date: date
):

    return db.query(Attendance).filter(
        Attendance.date == selected_date
    ).all()