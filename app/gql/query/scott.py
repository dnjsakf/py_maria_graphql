import graphene
from graphene import relay

from ..types import EmpType
from ..connections import EmpConnection

__all__ = [
  'EmpQuery'
]

class EmpQuery(graphene.ObjectType):
  emp = graphene.Field(
    EmpType,
    empno=graphene.Int(required=True), # Arguments
    resolver=lambda parent,info,empno: EmpType.get_query(info).filter_by(empno=empno).first()
  )
  empList = graphene.List(
    EmpType,
    resolver=lambda parent,info: EmpType.get_query(info).all()
  )
  emps = relay.ConnectionField(EmpConnection)
    
  def resolve_emps(self, info):
    return EmpType.get_query(info).all()
