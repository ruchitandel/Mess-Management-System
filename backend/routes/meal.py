from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.meal import MealCreate, MealResponse
from services.meal_service import (
    create_meal,
    get_all_meals,
    update_meal,
    delete_meal
)
from auth import require_role

router = APIRouter(prefix="/meals", tags=["Meals"])


# ================= CREATE =================
@router.post("/", response_model=MealResponse)
def add_meal(
    meal: MealCreate,
    db: Session = Depends(get_db),
    user=Depends(require_role(1))
):
    return create_meal(db, meal)


# ================= GET =================
@router.get("/", response_model=list[MealResponse])
def view_meals(db: Session = Depends(get_db)):
    return get_all_meals(db)


# ================= UPDATE =================
@router.put("/{meal_id}", response_model=MealResponse)
def edit_meal(
    meal_id: int,
    meal: MealCreate,
    db: Session = Depends(get_db),
    user=Depends(require_role(1))
):
    updated = update_meal(db, meal_id, meal)
    if not updated:
        raise HTTPException(status_code=404, detail="Meal not found")
    return updated


# ================= DELETE =================
@router.delete("/{meal_id}")
def remove_meal(
    meal_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_role(1))
):
    deleted = delete_meal(db, meal_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Meal not found")

    return {"message": "Meal deleted successfully"}