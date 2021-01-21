import mariadb
from pprint import pprint

class TestMariaDB(object):

  conn = mariadb.connect(
    host="127.0.0.1",
    port=3306,
    database="SCOTT",
    user="dochi",
    password="dochi"
  )
  
  def __init__(self):
    print("UserModel 테스트")
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
    ''' 연결 테스트 '''
    cursor = self.conn.cursor(dictionary=True)
    cursor.execute('''
      SELECT *
        FROM SCOTT.EMP
       LIMIT 1
    ''')
    records = cursor.fetchone()
    cursor.close()
    
    pprint( records, indent=2 )

# 테스트실행
TestMariaDB()