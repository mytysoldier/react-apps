import json
import os
from fastapi import File, UploadFile
import pandas as pd
import requests

from constant.constant import ELASTIC_SEARCH_REQUEST_HEADERS, ELASTIC_SEARCH_URL


async def upload_excel(file: UploadFile = File(...)):
    try:
        file_name = file.filename

        file_path = os.path.join(os.getcwd(), file_name)

        # アップロードされたファイルを保存
        with open(file_path, "wb") as f:
            f.write(await file.read())

        # ブック全体の内容を入れるための空のリストを作成
        book_content = []

        # Excelファイルから各シートのデータを読み込んでリストに追加する
        with pd.ExcelFile(file_path) as xls:
            for sheet_name in xls.sheet_names:
                df = pd.read_excel(xls, sheet_name)
                records = df.to_dict(orient="records")
                book_content.extend(records)

        # Elasticsearchに送信するデータを構築
        data = {
            "doc": {
                "name": file_name,
                "text": json.dumps(book_content, ensure_ascii=False),
            }
        }
        print("Uploaded file data:", data)

        response = requests.post(
            ELASTIC_SEARCH_URL,
            json=data,
            headers=ELASTIC_SEARCH_REQUEST_HEADERS,
        )
        if response.status_code == 201:
            print("Document indexed successfully.")
        else:
            print(f"Failed to index document. Status code: {response.text}")
            return False

        # 一時ファイルを削除
        os.unlink(file_path)

        return True
    except Exception as e:
        print(
            f"Error: An error occurred while processing uploading excel to Elasticsearch: {str(e)}"
        )
        return False
