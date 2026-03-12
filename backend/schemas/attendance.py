from pydantic import BaseModel
from datetime import date


class AttendanceCreate(BaseModel):
    student_id: int
    meal_id: int
    date: date


class AttendanceResponse(BaseModel):
    id: int
    student_id: int
    meal_id: int
    date: date

    class Config:
        from_attributes = True