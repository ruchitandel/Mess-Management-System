from pydantic import BaseModel
from datetime import datetime

class AnnouncementCreate(BaseModel):
    title: str
    message: str

class AnnouncementResponse(AnnouncementCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
