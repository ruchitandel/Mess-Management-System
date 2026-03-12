from sqlalchemy.orm import Session
from sqlalchemy import func
from models.billing import Billing
from models.student import Student
from models.attendance import Attendance
from models.user import User
from fastapi import HTTPException
from datetime import date

MEAL_COST = 80


def generate_monthly_bill(db: Session, user_id: int, month: date):

    student = db.query(Student).filter(
        Student.user_id == user_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    existing_bill = db.query(Billing).filter(
        Billing.student_id == student.id,
        func.date_trunc("month", Billing.month) ==
        func.date_trunc("month", month)
    ).first()

    if existing_bill:
        raise HTTPException(
            status_code=400,
            detail="Bill already generated for this month"
        )

    total_meals = db.query(func.count(Attendance.id)).filter(
        Attendance.student_id == student.id,
        func.date_trunc("month", Attendance.date) ==
        func.date_trunc("month", month)
    ).scalar() or 0

    bill_amount = total_meals * MEAL_COST

    billing = Billing(
        student_id=student.id,
        total_meals=total_meals,
        bill_amount=bill_amount,
        month=month
    )

    db.add(billing)
    db.commit()
    db.refresh(billing)

    return billing


def pay_bill(db: Session, billing_id: int, payment_mode: str):

    bill = db.query(Billing).filter(
        Billing.id == billing_id
    ).first()

    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")

    bill.payment_status = "Paid"
    bill.payment_mode = payment_mode

    db.commit()
    db.refresh(bill)

    return bill


def get_my_bills(db: Session, user_id: int):

    student = db.query(Student).filter(
        Student.user_id == user_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return db.query(Billing).filter(
        Billing.student_id == student.id
    ).all()


def get_all_bills(db: Session):

    bills = (
        db.query(
            Billing.id,
            User.name,
            Billing.total_meals,
            Billing.bill_amount,
            Billing.payment_status
        )
        .join(Student, Billing.student_id == Student.id)
        .join(User, Student.user_id == User.id)
        .all()
    )

    return [
        {
            "id": b.id,
            "student": b.name,
            "attendance_days": b.total_meals,
            "cost_per_day": MEAL_COST,
            "total_bill": float(b.bill_amount),
            "status": b.payment_status
        }
        for b in bills
    ]


def get_monthly_summary(db: Session, month):

    total_meals = db.query(func.sum(Billing.total_meals)).scalar() or 0

    total_revenue = db.query(func.sum(Billing.bill_amount)).filter(
        Billing.payment_status == "Paid"
    ).scalar() or 0

    pending = db.query(func.sum(Billing.bill_amount)).filter(
        Billing.payment_status == "Pending"
    ).scalar() or 0

    return {
        "total_meals": int(total_meals),
        "total_revenue": float(total_revenue),
        "pending_amount": float(pending)
    }