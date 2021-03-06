import graphene

from sqlalchemy import asc, desc, func, Integer
from sqlalchemy.orm import aliased
from sqlalchemy.sql.expression import cast
from app.database import session

from graphene_sqlalchemy import SQLAlchemyConnectionField

from ..types.lotto import LottoPrzwinType
from ..connections.lotto import (
  LottoPrzwinConnection
)

__all__ = [
  'LottoQuery'
]

class InputPagination(graphene.InputObjectType):
  page = graphene.Int(default_value=1)
  rows_per_page = graphene.Int(default_value=10)
  
class LottoQuery(graphene.ObjectType):
  total_count = graphene.Field(graphene.Int)
  przwin_list = graphene.List(
    LottoPrzwinType,
    pagination=InputPagination()
  )

  przwin_list_page = graphene.List(
    LottoPrzwinType,
    pagination=InputPagination()
  )
  przwins = SQLAlchemyConnectionField(LottoPrzwinConnection)

  def resolve_total_count(root, info):
    return LottoPrzwinType.get_query(info).count()

  def resolve_przwin_list(root, info, pagination=None):
    Model = LottoPrzwinType._meta.model
    query = LottoPrzwinType.get_query(info)

    return query.order_by(desc(Model.drwt_no)).all()

  def resolve_przwin_list_page(root, info, pagination=None):
    page = int(pagination.get("page"))
    rows_per_page = int(pagination.get("rows_per_page"))

    rn_start = ( page ) * rows_per_page
    rn_end = rn_start + rows_per_page

    Model = LottoPrzwinType._meta.model

    t1 = session.query(Model) \
      .add_column(func.row_number().over(order_by=desc(Model.drwt_no)).label('rn')) \
      .cte(recursive=False, name="SRC_OBJ")

    query = session.query(Model) \
      .select_entity_from(t1) \
      .filter(t1.c.rn > rn_start) \
      .filter(t1.c.rn <= rn_end)
    
    return query.all()
