from sqlalchemy.orm import Session
from models.student import Student
from models.user import User


def get_all_students(db: Session):

    students = (
        db.query(
            Student.id,
            User.name
        )
        .join(User, Student.user_id == User.id)
        .order_by(User.name)
        .all()
    )

    return [
        {
            "id": s.id,
            "name": s.name
        }
        for s in students
    ]