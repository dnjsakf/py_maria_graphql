import graphene
from graphene import relay

from ..types import MenuType
from ..connections import MenuConnection

__all__ = [
  'MenuQuery'
]

class MenuQuery(graphene.ObjectType):
  menus = relay.ConnectionField(MenuConnection)

  def resolve_menus(root, info, **input):
    return MenuType.get_query(info).filter_by(pmenu=None).all()
