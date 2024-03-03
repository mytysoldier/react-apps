from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from funcs.search_document.search_document import search_document
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/search")
def search():
    return search_document()

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    contents = await file.read()
    print("Uploaded file name:", file.filename)
    print("Uploaded file type:", file.content_type)
    return JSONResponse(content={"message": "File uploaded successfully"})