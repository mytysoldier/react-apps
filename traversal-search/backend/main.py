from csv import DictReader

from elasticsearch import Elasticsearch


csv_file = "input.csv"

elasticsearch_host = "localhost"
index_name = "book"

es = Elasticsearch([f"http://{elasticsearch_host}:9200"])
# es = Elasticsearch([{"host": elasticsearch_host, "port": 9200, "scheme": "http"}])

with open(csv_file, "rt", encoding= "utf-8") as file:
    reader = DictReader(file)

    for row in reader:
        doc = row
        isbn = doc["isbn"]

        es.index(index=index_name, id=isbn, body=doc)
