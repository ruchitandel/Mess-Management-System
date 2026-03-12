from sqlalchemy import Column, Integer, String
from database import Base


class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String(100), nullable=False)
    quantity = Column(Integer, nullable=False)
    minimum_threshold = Column(Integer, nullable=False)