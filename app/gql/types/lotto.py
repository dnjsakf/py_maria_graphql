import datetime

from graphene_sqlalchemy import SQLAlchemyObjectType

from app.models.lotto import IF_LOTTO_PRZWIN_MST
from ..nodes import LottoPrzwinNode

__all__ = [
  'LottoPrzwinType'
]

class LottoPrzwinType(SQLAlchemyObjectType):
  class Meta:
    model = IF_LOTTO_PRZWIN_MST
    interfaces = (LottoPrzwinNode, )

  def reoslve_drwt_no_date(parent, info, **kwargs):
    return datetime.datetime.strptime(parent.drwt_no_date, "%Y%m%d").strftime("%Y-%m-%d")

types = [
  LottoPrzwinType
]