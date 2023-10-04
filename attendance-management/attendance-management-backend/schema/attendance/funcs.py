from typing import Optional
from schema.models import Attendance
from db.attendance.funcs import create_attendance, select_attendance, put_attendance
from db.db import engine
from datetime import date, datetime


def register_attendance(status: str, start_time: datetime):
    created_attendance = create_attendance(engine, status, start_time)
    return Attendance(
        id=created_attendance.id,
        date=created_attendance.date,
        start_time=created_attendance.start_time,
        end_time=created_attendance.end_time,
        break_start_time=created_attendance.break_start_time,
        break_end_time=created_attendance.break_end_time,
        status=created_attendance.status,
        work_time=created_attendance.work_time,
        over_work_time=created_attendance.over_work_time,
        late_night_work_time=created_attendance.late_night_work_time,
        holiday_work_time=created_attendance.holiday_work_time,
    )


def update_attendance(
    id: int,
    end_time: Optional[datetime] = None,
    break_start_time: Optional[datetime] = None,
    break_end_time: Optional[datetime] = None,
):
    attendance = put_attendance(engine, id, end_time, break_start_time, break_end_time)
    return Attendance(
        id=attendance.id,
        date=attendance.date,
        start_time=attendance.start_time,
        end_time=attendance.end_time,
        break_start_time=attendance.break_start_time,
        break_end_time=attendance.break_end_time,
        status=attendance.status,
        work_time=attendance.work_time,
        over_work_time=attendance.over_work_time,
        late_night_work_time=attendance.late_night_work_time,
        holiday_work_time=attendance.holiday_work_time,
    )
