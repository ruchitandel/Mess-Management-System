from pydantic import BaseModel
from datetime import date

class WastageCreate(BaseModel):
    meal_id: int
    quantity_wasted: float
    reason: str
    date: date

class WastageResponse(WastageCreate):
    id: int

    class Config:
        from_attributes = True
