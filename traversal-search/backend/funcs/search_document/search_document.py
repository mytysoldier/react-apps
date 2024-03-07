import requests
from models.search_document import SearchDocumentResponse, SearchDocumentResult


def search_document(text: str):
    try:
        # Elasticsearchへのクエリ実行
        query = {"query": {"wildcard": {"doc.text": f"*{text}*"}}}
        response = requests.post("http://localhost:9200/book/_search", json=query)

        # ステータスコードが200以外の場合はエラーを出力して終了
        if response.status_code != 200:
            print(
                f"Error: Failed to retrieve data from Elasticsearch. Status code: {response.status_code}"
            )
            return SearchDocumentResponse(count=0, result=[])

        # レスポンスからhitsを取得
        data = response.json()["hits"]["hits"]

        # 検索結果を格納するリスト
        search_results = []

        # レスポンスのhitsに対してループ処理
        for hit in data:
            file_name = hit["_source"]["doc"]["name"]
            # textがリストか文字列かで処理を分岐
            text_content = hit["_source"]["doc"]["text"]
            if isinstance(text_content, list):
                # textがリストの場合、各要素を連結して1つの文字列にする
                text_content = "\n".join(text_content)
            search_results.append(
                SearchDocumentResult(file_name=file_name, text=text_content)
            )

        # 検索結果をSearchDocumentResponseに格納して返す
        return SearchDocumentResponse(count=len(search_results), result=search_results)
    except Exception as e:
        print(
            f"Error: An error occurred while processing the response from Elasticsearch: {str(e)}"
        )
        return SearchDocumentResponse(count=0, result=[])
