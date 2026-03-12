from sqlalchemy import Column, Integer, String, Text, ForeignKey
from database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    food_type = Column(String(20))
    allergy_notes = Column(Text)
