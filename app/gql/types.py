import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType

from .nodes import EmpNode, MenuNode
from ..models.scott import EmpModel
from ..models.common import MN_MENU_MST

class EmpType(SQLAlchemyObjectType):
  class Meta:
    model = EmpModel
    interfaces = (EmpNode, )

class MenuType(SQLAlchemyObjectType):
  class Meta:
    model = MN_MENU_MST
    interfaces = (MenuNode, )
