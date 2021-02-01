import graphene

from .base import input_to_dictionary
from ..types.scott import EmpType

__all__ = [
  'EmpMutation'
]

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
  success = graphene.Boolean()

  @staticmethod
  def mutate(self, info, input):
    Model = EmpType._meta.model
    data = input_to_dictionary(input)
    emp = Model(**data)
    session.add(emp)
    session.commit()
    success = True
    return CreateEmp(emp=emp, success=success)

class EmpMutation(graphene.ObjectType):
  createEmp = CreateEmp.Field()
