from fastapi import FastAPI
import strawberry

from db.db import initialize_db

from schema.schema import Query
from strawberry.asgi import GraphQL
from strawberry.fastapi import GraphQLRouter

# DB初期化
initialize_db()

# GraphQLスキーマ
schema = strawberry.Schema(Query)
graphql_app = GraphQLRouter(schema)

# サーバー起動
app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")
