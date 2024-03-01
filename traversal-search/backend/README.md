# 横断検索アプリケーションバックエンド

フロントエンドから各データソースのデータを受け取り、その値をElasticSearchのインデックスに保存する。
また、保存されているドキュメントの読み書きの機能も提供する。

## 使用技術
- Python
- ElasticSearch
- Docker

## 検索クエリー例

・特定の文字列が含まれるドキュメントを検索
```
curl -X POST "http://localhost:9200/book/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "match_phrase": {
      "doc.text": "isbn"
    }
  }
}
'
```