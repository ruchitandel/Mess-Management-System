from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Attendance(Base):

    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("students.user_id"), nullable=False)

    meal_id = Column(Integer, ForeignKey("meals.id"), nullable=False)

    date = Column(Date, nullable=False)

    # relationships
    student = relationship("Student")