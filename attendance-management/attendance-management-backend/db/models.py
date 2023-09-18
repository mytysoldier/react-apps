from datetime import date, datetime
from typing import Optional
from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    company_name: str
    age: int


class Attendance(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    date: date
    start_time: datetime
    end_time: Optional[datetime]
    status: str
    work_time: Optional[int]
    over_work_time: Optional[int]
    late_night_work_time: Optional[int]
    holiday_work_time: Optional[int]
