import requests
from models.search_document import SearchDocumentResponse, SearchDocumentResult


def search_document():
    try:
        # Elasticsearchへのクエリ実行
        response = requests.get("http://localhost:9200/book/_search?pretty")

        # ステータスコードが200以外の場合はエラーを出力して終了
        if response.status_code != 200:
            print(f"Error: Failed to retrieve data from Elasticsearch. Status code: {response.status_code}")
            return SearchDocumentResponse(count=0, result=[])
        
        # レスポンスからtextの内容を取得して結果を返す
        data = response.json()
        file_name = data['hits']['hits'][0]['_source']['doc']['title']
        text_content = data['hits']['hits'][0]['_source']['doc']['text']
        return SearchDocumentResponse(count=1, result=[SearchDocumentResult(file_name=file_name, text=text_content)])
    except Exception as e:
        print(f"Error: An error occurred while processing the response from Elasticsearch: {str(e)}")
        return SearchDocumentResponse(count=0, result=[])
    
    