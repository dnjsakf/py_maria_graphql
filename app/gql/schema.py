import graphene
import mariadb

from app.models import EmpModel

conn = mariadb.connect(
  host="127.0.0.1",
  port=3306,
  database="SCOTT",
  user="dochi",
  password="dochi"
)

emp = EmpModel(empno=10)
print( EmpModel.query )

def getEmp(empno):
  cursor = conn.cursor(dictionary=True)
  cursor.execute('''
    SELECT *
      FROM SCOTT.EMP
     WHERE 1=1
       AND EMPNO = ?
  ''', (empno, ))
  record = cursor.fetchone()
  cursor.close()

  return EmpType(
    empno=record.get("EMPNO"),
    ename=record.get("ENAME"),
    job=record.get("JOB"),
    mgr=record.get("MGR"),
    hiredate=record.get("HIREDATE"),
    sal=record.get("SAL"),
    comm=record.get("COMM"),
    deptno=record.get("DEPTNO"),
  )

def getEmpList():
  cursor = conn.cursor(dictionary=True)
  cursor.execute('''
    SELECT *
      FROM SCOTT.EMP
     WHERE 1=1
  ''')
  records = cursor.fetchall()
  cursor.close()

  return [EmpType(
    empno=record.get("EMPNO"),
    ename=record.get("ENAME"),
    job=record.get("JOB"),
    mgr=record.get("MGR"),
    hiredate=record.get("HIREDATE"),
    sal=record.get("SAL"),
    comm=record.get("COMM"),
    deptno=record.get("DEPTNO"),
  ) for record in records]
  
class EmpNode(graphene.relay.Node):
  class Meta:
    name = 'EmpNode'

  @staticmethod
  def to_global_id(type_, empno):
    return f"{type_}:{empno}"

  @staticmethod
  def get_node_from_global_id(info, global_id, only_type=None):
    '''
      called: EmpNode.Field()
    '''
    type_, empno = global_id.split(':')
    if only_type:
      assert type_ == only_type._meta.name, 'Received not compatible node.'

    if type_ == 'EmpType':
      return getEmp(empno)

class EmpType(graphene.ObjectType):
  class Meta:
    interfaces = (EmpNode, )
    
  empno = graphene.Int()
  ename = graphene.String()
  job = graphene.String()
  mgr = graphene.String()
  hiredate = graphene.String()
  sal = graphene.Int()
  comm = graphene.Int()
  deptno = graphene.Int()
  
class EmpConnection(graphene.relay.Connection):
  class Meta:
    node = EmpType
    
  total_count = graphene.Int()
  edge_count = graphene.Int()
    
  def resolve_total_count(root, info, **input):
    if root.total_count is not None:
      return root.total_count
    else:
      # return root.iterable.count()
      return len(root.iterable)
  
  def resolve_edge_count(root, info, **input):
    return len(root.edges)
  
class EmpQuery(graphene.ObjectType):
  emp = graphene.Field(
    EmpType,
    empno=graphene.Int(required=True),
    resolver=lambda parent,info,empno: getEmp(empno)
  )
  empList = graphene.List(
    EmpType,
    resolver=lambda parent,info: getEmpList()
  )
  emps = graphene.relay.ConnectionField(EmpConnection)
    
  def resolve_emps(self, info, **args):
    return getEmpList()
  
  @classmethod
  def get_node(cls, info, id):
    print( cls, info, id )
    return getEmp(id)

class Query(EmpQuery, graphene.ObjectType):
  pass
    
# Schema 생성
schema = graphene.Schema(
  query=Query
)
