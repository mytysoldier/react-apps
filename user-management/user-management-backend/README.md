# ユーザーデータ操作のバックエンド処理を提供

## 使用技術

- Python
- FastAPI
- Docker
- MongoDB

## Tips

### Docker 環境再構築

```
docker-compose up -d --build
```

### 稼働中の MongoDB コンテナに接続

```
docker exec -it user_management_db mongosh -u root -p password
```
