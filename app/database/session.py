from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

#engine = create_engine("oracle://LOTTO:lotto12!#@127.0.0.1:1521/CAMPDB", convert_unicode=True)
#engine = create_engine("mysql+mysqldb://dochi:dochi@127.0.0.1/lotto?charset=utf8mb4", convert_unicode=True)
engine = create_engine("sqlite:///app/database/example.db", convert_unicode=True)
session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
