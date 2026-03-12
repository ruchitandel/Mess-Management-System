from sqlalchemy.orm import Session
from models.meal import Meal


def create_meal(db: Session, meal_data):
    new_meal = Meal(
        meal_type=meal_data.meal_type,
        day_of_week=meal_data.day_of_week,
        food_items=meal_data.food_items,
        special_menu=meal_data.special_menu,
    )

    db.add(new_meal)
    db.commit()
    db.refresh(new_meal)
    return new_meal


def get_all_meals(db: Session):
    return db.query(Meal).all()


def update_meal(db: Session, meal_id: int, meal_data):
    meal = db.query(Meal).filter(Meal.id == meal_id).first()

    if not meal:
        return None

    meal.meal_type = meal_data.meal_type
    meal.day_of_week = meal_data.day_of_week
    meal.food_items = meal_data.food_items
    meal.special_menu = meal_data.special_menu

    db.commit()
    db.refresh(meal)
    return meal


def delete_meal(db: Session, meal_id: int):
    meal = db.query(Meal).filter(Meal.id == meal_id).first()

    if not meal:
        return None

    db.delete(meal)
    db.commit()
    return meal