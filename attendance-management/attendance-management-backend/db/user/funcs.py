from db.models import User
from sqlmodel import Session, select


# ユーザー一覧取得
def select_users(engine):
    with Session(engine) as session:
        statement = select(User)
        results = session.exec(statement)
        user_list = list(results)
        return user_list
