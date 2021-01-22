from sqlalchemy import Column, String, Integer, ForeignKey
from ..database.base import Base

class DeptModel(Base):
  __tablename__ = "dept"

  deptno = Column(Integer, primary_key=True)
  dname = Column(String(14))
  location = Column(String(13))
  
  def __repr__(self):
    return '<DeptModel %r>' % self.deptno

class EmpModel(Base):
  __tablename__ = "emp"

  empno     = Column(Integer, primary_key=True)
  ename     = Column(String(10))
  job       = Column(String(9))
  mgr       = Column(Integer)
  hiredate  = Column(String(12))
  sal       = Column(Integer)
  comm      = Column(Integer)
  deptno    = Column(Integer, ForeignKey('dept.deptno'))
  
  def __repr__(self):
    return '<EmpModel %r>' % self.empno
