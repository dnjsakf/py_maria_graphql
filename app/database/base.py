from sqlalchemy.ext.declarative import declarative_base

from .session import session

Base = declarative_base()
Base.query = session.query_property()