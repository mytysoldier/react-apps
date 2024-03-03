from csv import DictReader
import json
import requests
import pandas as pd

url = "http://localhost:9200/book/_doc"

headers = {
    "Content-Type": "application/json"
}

excel_file = "input.xlsx"

# ブック全体の内容を入れるための空のリストを作成
book_content = []

# Excelファイルから各シートのデータを読み込んでリストに追加する
with pd.ExcelFile(excel_file) as xls:
    for sheet_name in xls.sheet_names:
        df = pd.read_excel(xls, sheet_name)
        records = df.to_dict(orient="records")
        book_content.extend(records)

# Elasticsearchに送信するデータを構築
data = {"doc": {"text": json.dumps(book_content, ensure_ascii=False)}}

print(json.dumps(book_content, ensure_ascii=False))

# # Elasticsearchにデータを送信
# response = requests.post(url, json=data, headers=headers)

# # レスポンスの処理
# if response.status_code == 201:
#     print("Document indexed successfully.")
# else:
#     print(f"Failed to index document. Status code: {response.text}")
