from datetime import datetime
from graphene_sqlalchemy import SQLAlchemyObjectType

from app.models.schedule import (
  WK_SCHD_DATE,
  WK_SCHD_INTV,
  WK_SCHD_CRON,
  WK_SCHD_MST
)
from ..nodes.schedule import (
  DateScheduleNode,
  IntervalScheduleNode,
  CrontabScheduleNode,
  ScheduleNode
)

__all__ = [
  'DateScheduleType',
  'IntervalScheduleType',
  'CrontabScheduleType',
  'ScheduleType'
]

class DateScheduleType(SQLAlchemyObjectType):
  class Meta:
    model = WK_SCHD_DATE
    interfaces = (DateScheduleNode, )

class IntervalScheduleType(SQLAlchemyObjectType):
  class Meta:
    model = WK_SCHD_INTV
    interfaces = (IntervalScheduleNode, )

class CrontabScheduleType(SQLAlchemyObjectType):
  class Meta:
    model = WK_SCHD_CRON
    interfaces = (CrontabScheduleNode, )

class ScheduleType(SQLAlchemyObjectType):
  class Meta:
    model = WK_SCHD_MST
    interfaces = (ScheduleNode, )

  def resolve_reg_user(root, info):
    return "SYSTEM"

  def resolve_reg_dttm(root, info):
    return datetime.now().strftime("%Y%m%d%H%M%S")

types = [
  DateScheduleType,
  IntervalScheduleType,
  CrontabScheduleType,
  ScheduleType
]