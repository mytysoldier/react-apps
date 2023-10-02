# GraphQLスキーマモデル定義
from typing import Optional
import strawberry
from datetime import date, datetime


@strawberry.type
class User:
    id: int
    name: str
    company_name: str
    age: int


@strawberry.type
class Attendance:
    id: int
    date: date
    start_time: datetime
    end_time: Optional[datetime]
    status: str
    work_time: Optional[int]
    over_work_time: Optional[int]
    late_night_work_time: Optional[int]
    holiday_work_time: Optional[int]
