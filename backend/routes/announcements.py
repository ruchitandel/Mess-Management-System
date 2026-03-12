from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from auth import require_role
from schemas.announcement import AnnouncementCreate, AnnouncementResponse
from services.announcement_service import create_announcement, get_all_announcements

router = APIRouter(prefix="/announcements", tags=["Announcements"])


@router.post("/", response_model=AnnouncementResponse,
             dependencies=[Depends(require_role(1))])
def add_announcement(
    data: AnnouncementCreate,
    db: Session = Depends(get_db)
):
    return create_announcement(db, data)


@router.get("/", response_model=list[AnnouncementResponse])
def view_announcements(
    db: Session = Depends(get_db)
):
    return get_all_announcements(db)
