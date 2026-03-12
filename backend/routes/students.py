from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services.student_service import get_all_students
from auth import require_role
from models.user import User

router = APIRouter(prefix="/students", tags=["Students"])

@router.get("/", dependencies=[Depends(require_role(1))])  # Admin only
def get_students(
    db: Session = Depends(get_db)
):
    return get_all_students(db)
