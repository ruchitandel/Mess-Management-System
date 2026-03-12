from sqlalchemy.orm import Session
from models.inventory import Inventory

def get_low_stock_items(db: Session):
    return db.query(Inventory).filter(
        Inventory.quantity < Inventory.minimum_threshold
    ).all()
