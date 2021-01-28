import graphene

from .lotto import *
from .menus import *
from .schedule import *
from .scott import *

__all__ = [
  'EmpQuery',
  'MenuQuery',
  'LottoQuery',
  'ScheduleQuery'
]

class RootQuery(
    EmpQuery,
    MenuQuery,
    LottoQuery,
    ScheduleQuery,
    graphene.ObjectType
  ):
  pass