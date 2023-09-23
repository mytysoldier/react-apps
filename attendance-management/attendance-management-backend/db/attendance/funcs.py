from db.models import Attendance
from sqlmodel import Session, select
from datetime import date, datetime


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
