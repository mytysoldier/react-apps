from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


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

dummyUserData = [
    {"id": "1", "name": "John Doe", "type": "一般", "status": "有効"},
    {"id": "2", "name": "Jane Smith", "type": "一般", "status": "有効"},
    {"id": "3", "name": "Bob Johnson", "type": "一般", "status": "有効"},
]


@app.get("/users")
async def users():
    return dummyUserData


@app.get("/user")
async def user(id: str = Query(...)):
    target_user = [user for user in dummyUserData if user["id"] == id]
    target_user = target_user[0] if len(target_user) > 0 else None
    return target_user
