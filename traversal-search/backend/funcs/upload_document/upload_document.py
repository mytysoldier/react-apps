from fastapi import File, UploadFile

from constant.constant import FILE_TYPE_PDF
from funcs.upload_document.upload_pdf import upload_pdf


async def upload_document(file: UploadFile = File(...)):
    content_type = file.content_type
    if content_type == FILE_TYPE_PDF:
        await upload_pdf(file)
    else:
        print("not found")
        pass
