# GraphQLスキーマモデル定義
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
    end_time: datetime
    status: str
    work_time: int
    over_work_time: int
    late_night_work_time: int
    holiday_work_time: int
