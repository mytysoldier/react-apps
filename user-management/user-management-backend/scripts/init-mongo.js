// データベース作成
db = db.getSiblingDB('mydatabase')

// コレクション作成
db.createCollection('user')

// ドキュメント作成
db.user.insert({ id: 'user1' });