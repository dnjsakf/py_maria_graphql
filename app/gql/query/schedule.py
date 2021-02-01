import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField
from sqlalchemy import desc

from ..types.schedule import (
  DateScheduleType,
  IntervalScheduleType,
  CrontabScheduleType,
  ScheduleType
)
from ..connections.schedule import (
  DateScheduleConnection,
  IntervalScheduleConnection,
  CrontabScheduleConnection,
  ScheduleConnection
)

__all__ = [
  'ScheduleQuery'
]

class ScheduleQuery(graphene.ObjectType):
  schedules = SQLAlchemyConnectionField(ScheduleConnection)

  schedule_list = graphene.List(ScheduleType)

  def resolve_schedule_list(root, info):
    Model = ScheduleType._meta.model
    query = ScheduleType.get_query(info)

    return query.order_by(desc(Model.reg_dttm)).all()
