from typing import Optional
from db.models import Attendance
from sqlmodel import Session, select
from datetime import date, datetime, timedelta
import pytz


# 勤怠取得
def select_attendance(engine, id: int):
    with Session(engine) as session:
        statement = select(Attendance).where(Attendance.id == id)
        results = session.exec(statement)
        attendance = results.first()
        return attendance


# 本日の勤怠取得
def select_today_attendance(engine):
    with Session(engine) as session:
        statement = select(Attendance).where(Attendance.date == date.today())
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
def put_attendance(
    engine,
    id: int,
    end_time: Optional[datetime],
    break_start_time: Optional[datetime],
    break_end_time: Optional[datetime],
) -> Attendance:
    with Session(engine) as session:
        statement = select(Attendance).where(Attendance.id == id)
        results = session.exec(statement)
        attendance = results.one()

        # 休憩入り時刻を更新
        attendance.break_start_time = (
            break_start_time
            if break_start_time is not None
            else attendance.break_start_time
        )
        # 休憩戻り時刻を更新
        attendance.break_end_time = (
            break_end_time if break_end_time is not None else attendance.break_end_time
        )

        # 退勤時刻を更新
        attendance.end_time = end_time if end_time is not None else attendance.end_time
        if attendance.end_time is not None:
            print("attendance.end_timeの値:", attendance.end_time)
            # 勤務時間を計算
            tz = pytz.timezone("Asia/Tokyo")
            time_difference = attendance.end_time - tz.localize(attendance.start_time)

            # 休憩時間を計算
            break_time_difference = tz.localize(
                attendance.break_end_time
            ) - tz.localize(attendance.break_start_time)

            work_time = (time_difference - break_time_difference) / timedelta(hours=1)

            # work_time = time_difference / timedelta(hours=1)
            # 残業時間を計算
            over_work_time = 0 if work_time <= 8 else work_time - 8
            attendance.work_time = int(work_time)
            attendance.over_work_time = over_work_time
            # TODO 深夜勤務時間を計算
            # TODO 休日勤務時間を計算
        session.add(attendance)
        session.commit()
        session.refresh(attendance)
        print("更新完了！")
        return attendance
