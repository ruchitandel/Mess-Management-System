from sqlalchemy import Column, Integer, Date, ForeignKey, Numeric, Text
from database import Base

class Wastage(Base):
    __tablename__ = "wastage"

    id = Column(Integer, primary_key=True)
    meal_id = Column(Integer, ForeignKey("meals.id"))
    quantity_wasted = Column(Numeric(10,2))
    reason = Column(Text)
    date = Column(Date, nullable=False)
