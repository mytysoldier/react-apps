from sqlmodel import Session, col, create_engine, SQLModel, select, or_
from .models import *


database_url = "postgresql+psycopg2://user:password@localhost:5432/attendance_management"
engine = create_engine(database_url, echo=True)
SQLModel.metadata.create_all(engine)


def initialize_db():
    SQLModel.metadata.create_all(engine)

