import typing
from schema.funcs import get_users, get_attendances
from schema.attendance.funcs import register_attendance, update_attendance
from schema.models import User, Attendance
import strawberry


# GraphQLクエリ定義
@strawberry.type
class Query:
    # ユーザー取得
    users: typing.List[User] = strawberry.field(resolver=get_users)
    # 勤怠取得
    attendances: typing.List[Attendance] = strawberry.field(resolver=get_attendances)


# GraphQLミューテーション定義
@strawberry.type
class Mutation:
    # 勤怠登録
    register_attendance: Attendance = strawberry.mutation(resolver=register_attendance)
    # 勤怠更新
    update_attendance: Attendance = strawberry.mutation(resolver=update_attendance)
