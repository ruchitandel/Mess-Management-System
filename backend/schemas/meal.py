from pydantic import BaseModel
from typing import Optional

class MealCreate(BaseModel):
    meal_type: str
    day_of_week: str
    food_items: Optional[str] = None
    special_menu: Optional[str] = None


class MealResponse(BaseModel):
    id: int
    meal_type: str
    day_of_week: str
    food_items: Optional[str]
    special_menu: Optional[str]

    class Config:
        from_attributes = True
