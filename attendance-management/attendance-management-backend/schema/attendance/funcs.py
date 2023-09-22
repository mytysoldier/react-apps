from schema.models import Attendance
from db.attendance.funcs import create_attendance
from db.db import engine
from datetime import date


def register_attendance(status: str):
    created_attendance = create_attendance(engine, status)
    return Attendance(
        id=created_attendance.id,
        date=created_attendance.date,
        start_time=created_attendance.start_time,
        end_time=created_attendance.end_time,
        status=created_attendance.status,
        work_time=created_attendance.work_time,
        over_work_time=created_attendance.over_work_time,
        late_night_work_time=created_attendance.late_night_work_time,
        holiday_work_time=created_attendance.holiday_work_time,
    )
