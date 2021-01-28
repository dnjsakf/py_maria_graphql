from graphene_sqlalchemy import SQLAlchemyObjectType

from app.models.common import MN_MENU_MST
from ..nodes import MenuNode

__all__ = [
  'MenuType'
]

class MenuType(SQLAlchemyObjectType):
  class Meta:
    model = MN_MENU_MST
    interfaces = (MenuNode, )

types = [
  MenuType
]