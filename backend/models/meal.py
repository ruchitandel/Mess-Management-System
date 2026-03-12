from sqlalchemy import Column, Integer, String, Text
from database import Base


class Meal(Base):
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, index=True)
    meal_type = Column(String(20), nullable=False)
    day_of_week = Column(String(20), nullable=False)
    food_items = Column(Text)
    special_menu = Column(Text)