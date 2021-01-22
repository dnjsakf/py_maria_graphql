from pprint import pprint

from app.database import init_db
from app.models.test import EmpModel, DeptModel 

init_db()

class TestSQLAlchemy(object):  
  def __init__(self):
    print("SQLAlchemy 테스트")
    print("="*40)
    for attrname in dir(self):
      testcase = getattr(self, attrname)
      if attrname.startswith("test") and callable(testcase):
        print("="*40)
        print( testcase.__doc__ )
        print("="*40)
        try:
          testcase()
        except Exception as e:
          print("Error: "+str(e))
        print("")
        print("="*40)

  def test_case_1(self):
    print(EmpModel.query.all())

# 테스트 실행
TestSQLAlchemy()