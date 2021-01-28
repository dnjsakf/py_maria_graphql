import graphene

from uuid import uuid4
from app.database import session

from .base import input_to_dictionary
from ..types import (
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
  crontab    = graphene.String(max=50)

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

    main_data = input_to_dictionary(input)
    if main_data.get("schd_id") is None:
      main_data["schd_id"] = str(uuid4())

    schd_type = main_data.get("schd_type", None)
    if schd_type == 'date':
      SubType = DateScheduleType
      main_data["date_schd_id"] = main_data["schd_id"]
    elif schd_type == 'interval':
      SubType = IntervalScheduleType
      main_data["intv_schd_id"] = main_data["schd_id"]
    elif schd_type == 'crontab':
      SubType = CrontabScheduleType
      main_data["cron_schd_id"] = main_data["schd_id"]
    else:
      return CreateSchedule(schedule=None, success=False)
    

    sub_data = dict(kwargs.get(schd_type, None))
    sub_data["schd_id"] = main_data["schd_id"]
      
    MainModel = MainType._meta.model
    SubModel = SubType._meta.model

    main_model = MainModel(**main_data)
    sub_model = SubModel(**sub_data)
    # main_model = MainModel(**dict([
    #   (col, data.get(col)) for col in MainModel.__table__.columns.keys()
    # ]))
    # sub_model = SubModel(**dict([
    #   (col, data.get(col)) for col in SubModel.__table__.columns.keys()
    # ]))
    
    session.add(sub_model)
    session.add(main_model)
    session.commit()
    success = True

    return CreateSchedule(schedule=main_model, success=success)

class ScheduleMutation(graphene.ObjectType):
  createSchedule = CreateSchedule.Field()
