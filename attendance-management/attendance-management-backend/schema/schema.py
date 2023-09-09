import typing
import strawberry


# GraphQLスキーマ定義
@strawberry.type
class User:
    id: int
    name: str
    company_name: str
    age: int


def get_users():
    return [User(id=1, name="user", company_name="user company", age=10)]


# GraphQLクエリ定義
@strawberry.type
class Query:
    users: typing.List[User] = strawberry.field(resolver=get_users)
