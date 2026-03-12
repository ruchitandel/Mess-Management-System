from sqlalchemy.orm import Session
from sqlalchemy import func
from models.wastage import Wastage
from fastapi import HTTPException
from datetime import date

def create_wastage(db: Session, data):

    wastage = Wastage(
        meal_id=data.meal_id,
        quantity_wasted=data.quantity_wasted,
        reason=data.reason,
        date=data.date
    )

    db.add(wastage)
    db.commit()
    db.refresh(wastage)

    return wastage


def get_monthly_wastage(db: Session, month: date):

    return db.query(Wastage).filter(
        func.date_trunc('month', Wastage.date) ==
        func.date_trunc('month', month)
    ).all()
