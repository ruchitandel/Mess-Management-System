from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from auth import require_role
from models.inventory import Inventory

router = APIRouter(prefix="/inventory", tags=["Inventory"])


@router.get("/", dependencies=[Depends(require_role(1))])
def get_inventory(db: Session = Depends(get_db)):
    return db.query(Inventory).all()


@router.post("/", dependencies=[Depends(require_role(1))])
def add_item(item: dict, db: Session = Depends(get_db)):

    new_item = Inventory(
        item_name=item["item_name"],
        quantity=item["quantity"],
        unit=item["unit"]
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return new_item


@router.put("/{item_id}", dependencies=[Depends(require_role(1))])
def update_item(item_id: int, item: dict, db: Session = Depends(get_db)):

    inv = db.query(Inventory).filter(Inventory.id == item_id).first()

    if not inv:
        raise HTTPException(status_code=404, detail="Item not found")

    inv.item_name = item["item_name"]
    inv.quantity = item["quantity"]
    inv.unit = item["unit"]

    db.commit()
    db.refresh(inv)

    return inv


@router.delete("/{item_id}", dependencies=[Depends(require_role(1))])
def delete_item(item_id: int, db: Session = Depends(get_db)):

    inv = db.query(Inventory).filter(Inventory.id == item_id).first()

    if not inv:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(inv)
    db.commit()

    return {"message": "Deleted"}