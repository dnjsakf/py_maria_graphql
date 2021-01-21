from flask import current_app as app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine

db = SQLAlchemy(app)

class EmpModel(db.Model):
  empno     = db.Column(db.Integer, primary_key=True)
  ename     = db.Column(db.String(10))
  job       = db.Column(db.String(9))
  mgr       = db.Column(db.Integer)
  hiredate  = db.Column(db.String(12))
  sal       = db.Column(db.Integer)
  comm      = db.Column(db.Integer)
  deptno    = db.Column(db.Integer)
  
  def __repr__(self):
    return '<EmpModel %r>' % self.empno
