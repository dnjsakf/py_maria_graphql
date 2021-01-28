from graphene_sqlalchemy import SQLAlchemyObjectType

from app.models.scott import EmpModel
from ..nodes import EmpNode

__all__ = [
  'EmpType'
]

class EmpType(SQLAlchemyObjectType):
  class Meta:
    model = EmpModel
    interfaces = (EmpNode, )

types = [
  EmpType
]