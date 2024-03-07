from typing import Optional
from fastapi import FastAPI, File, Query, UploadFile
from fastapi.responses import JSONResponse
from funcs.search_document.search_document import search_document
from fastapi.middleware.cors import CORSMiddleware

from funcs.upload_document.upload_document import upload_document
from models.search_document import SearchDocumentResponse

app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのヘッダーを許可
)


@app.get("/")
def home():
    return {"home": "hello"}


@app.get("/search", response_model=SearchDocumentResponse)
def search(text: Optional[str] = Query(None, description="検索クエリー")):
    return search_document(text)


@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    # contents = await file.read()
    print("Uploaded file name:", file.filename)
    print("Uploaded file type:", file.content_type)
    await upload_document(file)
    return JSONResponse(content={"result": "success"})
