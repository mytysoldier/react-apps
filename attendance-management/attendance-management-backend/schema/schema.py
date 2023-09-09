import typing
from schema.funcs import get_users, get_attendances
from schema.models import User, Attendance
import strawberry


# GraphQLクエリ定義
@strawberry.type
class Query:
    users: typing.List[User] = strawberry.field(resolver=get_users)
    attendances: typing.List[Attendance] = strawberry.field(resolver=get_attendances)
