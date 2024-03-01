from csv import DictReader
import json
import requests
import pandas as pd

url = "http://localhost:9200/book/_doc"

headers = {
    "Content-Type": "application/json"
}

excel_file = "input.xlsx"

df = pd.read_excel(excel_file)

book_content = df.to_dict(orient="records")

print(book_content)

# # データフレームの各行を処理する
# for _, row in df.iterrows():
#     row_json = row.to_json(orient="columns")

# with open(csv_file, "rt", encoding="utf-8") as file:
#     reader = DictReader(file)

#     for row in reader:
#         row_json = json.dumps(row)
#         # doc = {
#         #     "doc": row_json,
#         # }

#         # response = requests.post(url, json=doc, headers=headers)
#         response = requests.post(url, json={"doc": {"text": row_json}}, headers=headers)
#         if response.status_code == 201:
#             print("Document indexed successfully.")
#         else:
#             print(f"Failed to index document. Status code: {response.text}")
