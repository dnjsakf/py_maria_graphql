import graphene

from .common import *
from .lotto import *
from .schedule import *
from .scott import *

__all__ = [
  'EmpQuery',
  # 'CodeTypeQuery',
  'CodeQuery',
  'MenuQuery',
  'LottoQuery',
  'ScheduleQuery'
]

class RootQuery(
    EmpQuery,
    # CodeTypeQuery,
    CodeQuery,
    MenuQuery,
    LottoQuery,
    ScheduleQuery,
    graphene.ObjectType
  ):
  pass