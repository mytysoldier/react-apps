from typing import Optional
from db.models import Attendance
from sqlmodel import Session, select
from datetime import date, datetime


# 勤怠取得
def select_attendance(engine, id: int):
    with Session(engine) as session:
        statement = select(Attendance).where(Attendance.id == id)
        results = session.exec(statement)
        attendance = results.first()
        return attendance


# 勤怠一覧取得
# TODO あとで修正
def select_attendances(engine):
    with Session(engine) as session:
        statement = select(Attendance)
        results = session.exec(statement)
        attendance_list = list(results)
        return attendance_list


# 勤怠登録
def create_attendance(engine, status: str, start_time: datetime) -> Attendance:
    new_attendance = Attendance(
        date=date.today(),
        status=status,
        start_time=start_time,
    )
    with Session(engine) as session:
        session.add(new_attendance)
        session.commit()
        session.refresh(new_attendance)
        return new_attendance


# 勤怠更新
def put_attendance(engine, id: int, end_time: Optional[datetime]) -> Attendance:
    with Session(engine) as session:
        statement = select(Attendance).where(Attendance.id == id)
        results = session.exec(statement)
        attendance = results.one()

        attendance.end_time = end_time if end_time is not None else attendance.end_time
        session.add(attendance)
        session.commit()
        session.refresh(attendance)
        return attendance
