from http.client import HTTPException
from bson import ObjectId
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Body
from pymongo import MongoClient
from bson.json_util import dumps

app = FastAPI()

# MongoDBの接続情報
MONGO_URI = "mongodb://root:password@mongodb:27017/"  # Docker ComposeでのMongoDBコンテナ名を指定

# MongoDBへの接続
client = MongoClient(MONGO_URI)
db = client["mydatabase"]
user_collection = db["user"]

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

# 送られてくるデータのサンプル
# dummyUserData = [
#     {"id": "1", "name": "John Doe", "type": "一般", "status": "有効"},
#     {"id": "2", "name": "Jane Smith", "type": "一般", "status": "有効"},
#     {"id": "3", "name": "Bob Johnson", "type": "一般", "status": "有効"},
# ]


@app.get("/users")
async def users(
    name: str = Query(None),
    type: str = Query(None),
    status: str = Query(None),
):
    query = {}
    if name is not None:
        query.update({"name": name})
    if type is not None:
        query.update({"type": type})
    if status is not None:
        query.update({"status": status})
    # projectionを指定して_idフィールドを非表示にする
    # projection = {"_id": 0}

    # result_cursor = user_collection.find({}, projection)
    result_cursor = user_collection.find(query)
    result_list = list(result_cursor)
    # JSON形式に変換して返却
    return dumps(result_list, ensure_ascii=False)


@app.get("/user")
async def user(id: str = Query(...)):
    query = {"_id": ObjectId(id)}
    # projectionを指定して_idフィールドを非表示にする
    # projection = {"_id": 0}

    # result = user_collection.find_one(query, projection)
    result = user_collection.find_one(query)
    if result is not None:
        return dumps(result, ensure_ascii=False)
    else:
        return {"message": "User not found"}


@app.post("/user")
async def insert_user(data: dict = Body(...)):
    try:
        result = user_collection.insert_one(data)
        print(result)
        return {"message": "Document created", "document_id": str(result.inserted_id)}
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))


@app.put("/user")
async def update_user(data: dict = Body(...)):
    try:
        query = {"_id": ObjectId(data["id"])}
        operation = {
            "$set": {
                "name": data["name"],
                "type": data["type"],
                "status": data["status"],
            }
        }
        result = user_collection.update_one(query, operation)
        print(result)
        return result.modified_count
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))


@app.delete("/user")
async def delete_user(id: str = 0):
    try:
        query = {"_id": ObjectId(id)}
        result = user_collection.delete_one(query)
        return result.deleted_count
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
