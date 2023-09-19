from schema.models import Attendance
from db.attendance.funcs import create_attendance
from db.db import engine
from datetime import date


def register_attendance(status: str):
    created_attendance = create_attendance(engine, status)
    return Attendance(id=created_attendance.id, date=created_attendance.date)
