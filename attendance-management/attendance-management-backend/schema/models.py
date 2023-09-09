# GraphQLスキーマモデル定義
import strawberry
from datetime import date


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
