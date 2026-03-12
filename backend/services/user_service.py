from models.user import User
from models.student import Student
from sqlalchemy.orm import Session
from fastapi import HTTPException
from auth import get_password_hash


def create_user(db: Session, data):

    existing = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    user = User(
        name=data.name,
        email=data.email,
        phone=data.phone,
        password=get_password_hash(data.password),
        role_id=data.role_id
    )

    db.add(user)
    db.flush()  # get ID without commit

    # Auto create student profile if role = Student
    if data.role_id == 2:

        student = Student(
            user_id=user.id,
            food_type="veg",
            allergy_notes=""
        )

        db.add(student)

    db.commit()
    db.refresh(user)

    return user