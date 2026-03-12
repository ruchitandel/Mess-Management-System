from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from database import Base
from sqlalchemy.sql import func

class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    message = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())
