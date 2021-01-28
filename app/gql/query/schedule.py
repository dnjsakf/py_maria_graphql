import graphene
from graphene import relay

from ..types import (
  DateScheduleType,
  IntervalScheduleType,
  CrontabScheduleType,
  ScheduleType
)
from ..connections import (
  DateScheduleConnection,
  IntervalScheduleConnection,
  CrontabScheduleConnection,
  ScheduleConnection
)

__all__ = [
  'ScheduleQuery'
]

class ScheduleQuery(graphene.ObjectType):
  schedules = relay.ConnectionField(ScheduleConnection)
