from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from database import get_db
from models.user import User
from models.student import Student
from auth import verify_password, create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    # ================= FIND USER =================

    user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or password"
        )

    # ================= VERIFY PASSWORD =================

    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or password"
        )

    # ================= FIND STUDENT =================

    student = db.query(Student).filter(
        Student.user_id == user.id
    ).first()

    # ================= CREATE TOKEN =================

    access_token = create_access_token(
        data={
            "user_id": user.id,
            "role_id": user.role_id
        }
    )

    # ================= RESPONSE =================

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role_id": user.role_id,
        "name": user.name,
        "user_id": user.id,
        "student_id": student.id if student else None
    }