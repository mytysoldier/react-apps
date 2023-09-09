from fastapi import FastAPI
import strawberry

from db.db import initialize_db

from schema.schema import Query
from strawberry.fastapi import GraphQLRouter

from fastapi.middleware.cors import CORSMiddleware

# DB初期化
initialize_db()

# GraphQLスキーマ
schema = strawberry.Schema(Query)
graphql_app = GraphQLRouter(schema)


# サーバー起動
app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

# CORS設定を追加
origins = [
    "http://localhost:3000",  # 許可したいオリジンを指定
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
