from .base import BaseConnection
from ..types.schedule import (
  DateScheduleType,
  IntervalScheduleType,
  CrontabScheduleType,
  ScheduleType
)

__all__ = [
  'DateScheduleConnection',
  'IntervalScheduleConnection',
  'CrontabScheduleConnection',
  'ScheduleConnection'
]

class DateScheduleConnection(BaseConnection):
  class Meta:
    node = DateScheduleType
    
class IntervalScheduleConnection(BaseConnection):
  class Meta:
    node = IntervalScheduleType
    
class CrontabScheduleConnection(BaseConnection):
  class Meta:
    node = CrontabScheduleType
    
class ScheduleConnection(BaseConnection):
  class Meta:
    node = ScheduleType
