from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.meal import Meal

router = APIRouter(
    prefix="/staff-meals",
    tags=["Staff Meals"]
)


@router.get("/")
def get_all_meals(db: Session = Depends(get_db)):

    meals = db.query(Meal).all()

    return [
        {
            "id": m.id,
            "name": m.name,
            "type": m.type
        }
        for m in meals
    ]