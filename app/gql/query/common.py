import graphene
from graphene import relay
from sqlalchemy import asc, desc

from graphene_sqlalchemy import SQLAlchemyConnectionField

from ..types.common import ParentCodeType, CodeType, MenuType
from ..connections.common import ParentCodeConnection, CodeConnection, MenuConnection

__all__ = [
  'CodeQuery',
  'MenuQuery'
]

class CodeQuery(graphene.ObjectType):
  code_types = SQLAlchemyConnectionField(ParentCodeConnection)
  codes = SQLAlchemyConnectionField(CodeConnection)

  def resolve_code_types(root, info, **input):
    return ParentCodeType.get_query(info).order_by(desc(ParentCodeType._meta.model.sort_order)).all()

  def resolve_codes(root, info, **input):
    return CodeType.get_query(info).order_by(asc(CodeType._meta.model.sort_order)).all()

class MenuQuery(graphene.ObjectType):
  menus = SQLAlchemyConnectionField(MenuConnection)

  def resolve_menus(root, info, **input):
    return MenuType.get_query(info).filter_by(pmenu=None).order_by(MenuType._meta.model.sort_order).all()
