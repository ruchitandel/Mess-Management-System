from sqlalchemy.orm import Session
from models.announcement import Announcement

def create_announcement(db: Session, data):

    announcement = Announcement(
        title=data.title,
        message=data.message
    )

    db.add(announcement)
    db.commit()
    db.refresh(announcement)

    return announcement


def get_all_announcements(db: Session):
    return db.query(Announcement).order_by(
        Announcement.created_at.desc()
    ).all()
