import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField

from .connections import EmpConnection, MenuConnection
from .types import EmpType, MenuType

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

class MenuQuery(graphene.ObjectType):
  menus = relay.ConnectionField(MenuConnection)

  def resolve_menus(root, info, **input):
    return MenuType.get_query(info).filter_by(pmenu=None).all()

class RootQuery(
    EmpQuery,
    MenuQuery,
    graphene.ObjectType
  ):
  pass