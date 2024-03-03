import PyPDF2
from pdfminer.high_level import extract_text
import requests

url = "http://localhost:9200/book/_doc"

headers = {
    "Content-Type": "application/json"
}

pdf_file = "input.pdf"

# pdf_text = ""
pdf_text = extract_text(pdf_file)

# with open(pdf_file, "rb") as file:
#     reader = PyPDF2.PdfReader(file)
#     num_pages = len(reader.pages)
#     for page_num in range(num_pages):
#         page = reader.pages[page_num]
#         pdf_text += page.extract_text()

# Elasticsearchに送信するデータを構築
data = {"doc": {
    "title": pdf_file,
    "text": pdf_text
    }}

# # Elasticsearchにデータを送信
response = requests.post(url, json=data, headers=headers)

# レスポンスの処理
if response.status_code == 201:
    print("Document indexed successfully.")
else:
    print(f"Failed to index document. Status code: {response.text}")
    