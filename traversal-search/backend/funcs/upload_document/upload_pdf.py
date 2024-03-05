import os
from tempfile import NamedTemporaryFile
from fastapi import File, UploadFile
from pdfminer.high_level import extract_text


async def upload_pdf(file: UploadFile = File(...)):
    try:
        file_name = file.filename

        file_path = os.path.join(os.getcwd(), file_name)

        # アップロードされたファイルを保存
        with open(file_path, "wb") as f:
            f.write(await file.read())

        # print("content:", await file.read())

        # # アップロードされたファイルを保存
        # with open(file_path, "wb") as f:
        #     while chunk := await file.read(1024):  # ここでファイルの内容を読み取ります
        #         f.write(chunk)

        # # PDFからテキストを抽出
        # with open(file_path, "rb") as pdf_file:
        #     file_text = extract_text(pdf_file)

        # PDFからテキストを抽出
        file_text = extract_text(file_path)

        # Elasticsearchに送信するデータを構築
        data = {"doc": {"name": file_name, "text": file_text}}
        print("Uploaded file data:", data)

        # # 一時ファイルを削除
        # os.unlink(file_path)

        return True
    except Exception as e:
        print(
            f"Error: An error occurred while processing uploading pdf to Elasticsearch: {str(e)}"
        )
        return False
