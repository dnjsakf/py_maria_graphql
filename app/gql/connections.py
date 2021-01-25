import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField

from sqlalchemy import select, func, case, asc, desc, literal
from sqlalchemy.orm import aliased
from ..database import session

from .types import EmpType, MenuType, MN_MENU_MST

class BaseConnection(relay.Connection):
  class Meta:
    abstract = True
  
  total_count = graphene.Int()
  edge_count = graphene.Int()
    
  def resolve_total_count(root, info, **input):
    if root.total_count is not None:
      return root.total_count
    else:
      return len(root.iterable)
  
  def resolve_edge_count(root, info, **input):
    return len(root.edges)

class EmpConnection(BaseConnection):
  class Meta:
    node = EmpType

class MenuConnection(BaseConnection):
  class Meta:
    node = MenuType