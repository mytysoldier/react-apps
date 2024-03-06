from fastapi import File, UploadFile

from constant.constant import FILE_TYPE_PDF, FILE_TYPE_CSV, FILE_TYPE_EXCEL
from funcs.upload_document.upload_pdf import upload_pdf
from funcs.upload_document.upload_csv import upload_csv
from funcs.upload_document.upload_excel import upload_excel


async def upload_document(file: UploadFile = File(...)):
    content_type = file.content_type
    if content_type == FILE_TYPE_PDF:
        await upload_pdf(file)
    elif content_type == FILE_TYPE_CSV:
        await upload_csv(file)
    elif content_type == FILE_TYPE_EXCEL:
        await upload_excel(file)
    else:
        print("not found")
        pass
