from datetime import datetime
from graphene_sqlalchemy import SQLAlchemyObjectType

from .base import BaseSQLAlchemyObjectType 

from app.models.common import (
  MT_CODE_TYPE_MST,
  MT_CODE_MST,
  MN_MENU_MST
)
from ..nodes.common import (
  ParentCodeNode,
  CodeNode,
  MenuNode
)

__all__ = [
  'ParentCodeType',
  'CodeType',
  'MenuType'
]

class ParentCodeType(SQLAlchemyObjectType):
  class Meta:
    model = MT_CODE_TYPE_MST
    interfaces = (ParentCodeNode, )

class CodeType(SQLAlchemyObjectType):
  class Meta:
    model = MT_CODE_MST
    interfaces = (CodeNode, )

class MenuType(SQLAlchemyObjectType):
  class Meta:
    model = MN_MENU_MST
    interfaces = (MenuNode, )

types = [
  ParentCodeType,
  CodeType,
  MenuType
]