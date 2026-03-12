from sqlalchemy import Column, Integer, ForeignKey, Numeric, String, Date
from database import Base


class Billing(Base):
    __tablename__ = "billing"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    total_meals = Column(Integer, default=0)
    bill_amount = Column(Numeric(10, 2), nullable=False)
    payment_status = Column(String(20), default="Pending")  # Paid / Pending
    payment_mode = Column(String(50), nullable=True)
    month = Column(Date, nullable=False)