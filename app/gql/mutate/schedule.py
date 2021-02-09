import graphene

from uuid import uuid4
from app.database import session

from .base import input_to_dictionary
from ..types.schedule import (
  DateScheduleType,
  IntervalScheduleType,
  CrontabScheduleType,
  ScheduleType
)

__all__ = [
  'ScheduleMutation'
]

class DateScheduleInput(graphene.InputObjectType):
  datetime    = graphene.String(max=14)
  date        = graphene.String(max=8)
  time        = graphene.String(max=6)

class IntervalScheduleInput(graphene.InputObjectType):
  weeks       = graphene.Int()
  days        = graphene.Int()
  hours       = graphene.Int()
  minutes     = graphene.Int()
  seconds     = graphene.Int()
  start_date  = graphene.String()
  end_date    = graphene.String()

class CrontabScheduleInput(graphene.InputObjectType):
  crontab     = graphene.String(max=50)

class ScheduleInput(graphene.InputObjectType):
  schd_id     = graphene.String()
  schd_type   = graphene.String(required=True)

class CreateDateSchedule(graphene.Mutation):
  class Arguments:
    input = DateScheduleInput(required=True)

  date_schedule = graphene.Field(lambda: DateScheduleType)
  success = graphene.Boolean()
  
  @staticmethod
  def mutate(self, info, input):
    Model = DateScheduleType._meta.model
    data = input_to_dictionary(input)
    date_schedule = Model(**data)

    session.add(date_schedule)
    session.commit()
    success = True

    return CreateDateSchedule(date_schedule=date_schedule, success=success)


class CreateSchedule(graphene.Mutation):
  class Arguments:
    input = ScheduleInput(required=True)
    date = DateScheduleInput()
    interval = IntervalScheduleInput()
    crontab = CrontabScheduleInput()

  schedule = graphene.Field(lambda: ScheduleType)
  success = graphene.Boolean()

  @staticmethod
  def mutate(self, info, input, **kwargs):
    MainType = ScheduleType
    SubType = None

    if input.get("schd_id") is None or input.get("schd_id") == '':
      input["schd_id"] = str(uuid4())
    
    schd_type = input.get("schd_type", None)
    sub_data = dict(kwargs.get(schd_type, None))
    sub_data["schd_id"] = input["schd_id"]
    sub_data["mst_id"] = input["schd_id"]

    model = MainType._meta.model(**input)
    if schd_type == 'date':
      model.date.append(DateScheduleType._meta.model(**sub_data))

    elif schd_type == 'interval':
      model.interval.append(IntervalScheduleType._meta.model(**sub_data))

    elif schd_type == 'crontab':
      model.crontab.append(CrontabScheduleType._meta.model(**sub_data))

    else:
      return CreateSchedule(schedule=None, success=False)

    # model = MainModel(**dict([
    #   (col, data.get(col)) for col in MainModel.__table__.columns.keys()
    # ]))
    
    session.add(model)
    session.commit()
    success = True

    return CreateSchedule(schedule=model, success=success)


class DeleteScheduleInput(graphene.InputObjectType):
  schd_ids = graphene.List(graphene.String, required=True)

class DeleteSchedule(graphene.Mutation):
  class Arguments:
    input = DeleteScheduleInput(required=True)

  deleted = graphene.Int()
  success = graphene.Boolean()

  @staticmethod
  def mutate(self, info, input, **kwargs):
    Type = ScheduleType
    Model = Type._meta.model

    schd_ids = input.get("schd_ids", [])

    deleted = ScheduleType.get_query(info).filter(
      Model.schd_id.in_(schd_ids)
    ).delete(synchronize_session=False) # fetch, evaluate
    session.commit()

    return DeleteSchedule(deleted=0, success=True)

class ScheduleMutation(graphene.ObjectType):
  createSchedule = CreateSchedule.Field()
  deleteSchedule = DeleteSchedule.Field()