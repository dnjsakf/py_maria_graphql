from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
  db.init_app(app)

  from .scott import (
    EmpModel, DeptModel
  )
  from .lotto import (
    IF_LOTTO_PRZWIN_MST
  )

  return db

__all__ = [
  "EmpModel",
  "DeptModel",
  "IF_LOTTO_PRZWIN_MST"
]