from db.attendance.funcs import (
    select_attendances,
    select_attendance,
    select_today_attendance,
)
from schema.models import User, Attendance
from db.user.funcs import select_users
from db.db import engine


# ユーザー一覧取得
def get_users():
    users = select_users(engine)
    results = []
    for user in users:
        results.append(
            User(
                id=user.id, name=user.name, company_name=user.company_name, age=user.age
            )
        )
    return results


# 勤怠状況取得
def get_attendance(id: int):
    attendance = select_attendance(engine, id)
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


# 本日の勤怠状況取得
def get_today_attendance():
    attendance = select_today_attendance(engine)
    return (
        Attendance(
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
        if attendance is not None
        else None
    )


# 勤怠状況一覧取得
def get_attendances():
    attendances = select_attendances(engine)
    results = []
    for attendance in attendances:
        results.append(
            Attendance(
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
        )
    return results
