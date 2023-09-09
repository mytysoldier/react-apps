from db.attendance.funcs import select_attendances
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


# 勤怠状況一覧取得
def get_attendances():
    attendances = select_attendances(engine)
    results = []
    for attendance in attendances:
        results.append(
            Attendance(
                id=attendance.id,
                date=attendance.date,
            )
        )
    return results