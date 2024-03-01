from csv import DictReader
import json
import requests

url = "http://localhost:9200/book/_doc"

headers = {
    "Content-Type": "application/json"
}

csv_file = "input.csv"

with open(csv_file, "rt", encoding="utf-8") as file:
    reader = DictReader(file)

    for row in reader:
        row_json = json.dumps(row)
        # doc = {
        #     "doc": row_json,
        # }

        # response = requests.post(url, json=doc, headers=headers)
        response = requests.post(url, json={"doc": {"text": row_json}}, headers=headers)
        if response.status_code == 201:
            print("Document indexed successfully.")
        else:
            print(f"Failed to index document. Status code: {response.text}")
