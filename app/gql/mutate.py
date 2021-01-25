import graphene
from graphql_relay.node.node import from_global_id

from .types import EmpType, EmpModel

def input_to_dictionary(input):
  """Method to convert Graphene inputs into dictionary"""
  dictionary = {}
  for key in input:
    # Convert GraphQL global id to database id
    if key[-2:] == 'id':
      input[key] = from_global_id(input[key])[1]
    dictionary[key] = input[key]
  return dictionary

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

class EmpMutation(graphene.ObjectType):
  createEmp = CreateEmp.Field()

class RootMutation(
    EmpMutation,
    graphene.ObjectType
  ):
  pass