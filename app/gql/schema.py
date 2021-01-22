import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType

from app.database.session import session
from app.models.scott import EmpModel

from graphql_relay.node.node import from_global_id

# https://medium.com/swlh/python-flask-with-graphql-server-with-sqlalchemy-and-graphene-and-sqlite-ac9fcc9d3d83

def input_to_dictionary(input):
  """Method to convert Graphene inputs into dictionary"""
  dictionary = {}
  for key in input:
    # Convert GraphQL global id to database id
    if key[-2:] == 'id':
      input[key] = from_global_id(input[key])[1]
    dictionary[key] = input[key]
  return dictionary


class EmpNode(graphene.relay.Node):
  class Meta:
    name = 'EmpNode'

  @staticmethod
  def to_global_id(type_, empno):
    return f"{type_}:{empno}"

  @staticmethod
  def get_node_from_global_id(info, global_id, only_type=None):
    print( global_id )
    type_, empno = global_id.split(':')
    if only_type:
      assert type_ == only_type._meta.name, 'Received not compatible node.'

    if type_ == 'EmpType':
      return getEmp(empno)

class EmpType(SQLAlchemyObjectType):
  class Meta:
    model = EmpModel
    interfaces = (EmpNode, )
  
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
    empno=graphene.Int(required=True), # Arguments
    # resolver=lambda parent,info,empno: EmpModel.query.filter_by(empno=empno).first()
    resolver=lambda parent,info,empno: EmpType.get_query(info).filter_by(empno=empno).first()
  )
  empList = graphene.List(
    EmpType,
    # resolver=lambda parent,info: EmpModel.query.all()
    resolver=lambda parent,info: EmpType.get_query(info).all()
  )
  emps = graphene.relay.ConnectionField(EmpConnection)
    
  def resolve_emps(self, info, **args):
    return EmpModel.query.all()
  
class Query(EmpQuery, graphene.ObjectType):
  pass

class CreateEmpInput(graphene.InputObjectType):
  empno     = graphene.Int(required=True)
  ename     = graphene.String()
  job       = graphene.String()
  mgr       = graphene.Int()
  hiredate  = graphene.String()
  sal       = graphene.Int()
  comm      = graphene.Int()
  deptno    = graphene.Int(required=True)

class CreateEmp(graphene.Mutation):
  class Arguments:
    input = CreateEmpInput(required=True)

  emp = graphene.Field(lambda: EmpType)
  ok = graphene.Boolean()

  @staticmethod
  def mutate(self, info, input):
    data = input_to_dictionary(input)
    emp = EmpModel(**data)
    session.add(emp)
    session.commit()
    ok = True
    return CreateEmp(emp=emp, ok=ok)

class Mutation(graphene.ObjectType):
  createEmp = CreateEmp.Field()
    
# Schema 생성
schema = graphene.Schema(
  query=Query,
  mutation=Mutation,
  types=[
    EmpType
  ]
)
