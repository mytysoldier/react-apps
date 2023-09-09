from schema.models import Attendance
from db.attendance.funcs import create_attendance
from db.db import engine


def register_attendance():
    created_attendance = create_attendance(engine)
    return Attendance(id=created_attendance.id, date=created_attendance.date)
