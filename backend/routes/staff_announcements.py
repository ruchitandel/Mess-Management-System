from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.announcement import Announcement

router = APIRouter(
    prefix="/staff-announcements",
    tags=["Staff Announcements"]
)


@router.get("/")
def get_announcements(db: Session = Depends(get_db)):

    announcements = db.query(Announcement).all()

    return [
        {
            "id": a.id,
            "title": a.title,
            "message": a.message,
            "date": a.date
        }
        for a in announcements
    ]