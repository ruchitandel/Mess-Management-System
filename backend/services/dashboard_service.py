from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from models.student import Student
from models.attendance import Attendance
from models.billing import Billing
from models.inventory import Inventory


def get_dashboard_overview(db: Session):

    today = date.today()

    total_students = db.query(func.count(Student.id)).scalar() or 0

    today_attendance = (
        db.query(func.count(Attendance.id))
        .filter(Attendance.date == today)
        .scalar() or 0
    )

    monthly_revenue = (
        db.query(func.sum(Billing.bill_amount))
        .filter(Billing.payment_status == "Paid")
        .scalar() or 0
    )

    monthly_revenue = float(monthly_revenue)

    low_stock_items = (
        db.query(func.count(Inventory.id))
        .filter(Inventory.quantity < 30)
        .scalar() or 0
    )

    pending_bills = (
        db.query(func.count(Billing.id))
        .filter(Billing.payment_status == "Pending")
        .scalar() or 0
    )

    return {
        "total_students": total_students,
        "today_attendance": today_attendance,
        "monthly_revenue": monthly_revenue,
        "low_stock_items": low_stock_items,
        "pending_bills": pending_bills
    }