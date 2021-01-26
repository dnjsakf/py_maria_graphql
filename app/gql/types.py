import graphene
import datetime

from graphene_sqlalchemy import SQLAlchemyObjectType

from .nodes import EmpNode, MenuNode, LottoPrzwinNode
from ..models.common import MN_MENU_MST
from ..models.scott import EmpModel
from ..models.lotto import IF_LOTTO_PRZWIN_MST

class EmpType(SQLAlchemyObjectType):
  class Meta:
    model = EmpModel
    interfaces = (EmpNode, )

class MenuType(SQLAlchemyObjectType):
  class Meta:
    model = MN_MENU_MST
    interfaces = (MenuNode, )

class LottoPrzwinType(SQLAlchemyObjectType):
  class Meta:
    model = IF_LOTTO_PRZWIN_MST
    interfaces = (LottoPrzwinNode, )

  def reoslve_drwt_no_date(parent, info, **kwargs):
    return datetime.datetime.strptime(parent.drwt_no_date, "%Y%m%d").strftime("%Y-%m-%d")

types = [
  EmpType,
  MenuType,
  LottoPrzwinType
]