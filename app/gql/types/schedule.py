import graphene
from datetime import datetime
from graphene_sqlalchemy import SQLAlchemyObjectType

from sqlalchemy.orm import aliased
from app.database import session

from app.models.common import (
  MT_CODE_TYPE_MST,
  MT_CODE_MST
)
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

  schd_type_nm = graphene.String()
  schd_status_nm = graphene.String()
  
  def resolve_schd_type_nm(root, info):
    T1 = aliased(MT_CODE_TYPE_MST, name="T1")
    T2 = aliased(MT_CODE_MST, name="T2")

    query = session.query(T2.code_nm).select_from(T1).join(T2, T1.code_type_id==T2.code_type_id).filter(
      T1.code_type_id=="schd_type", T1.use_yn=="Y",
      T2.code_id==str(root.schd_type), T2.use_yn=="Y"
    ).first()

    code_name = None
    if query is not None:
      code_name = query[0]

    return code_name

  def resolve_schd_status_nm(root, info):
    T1 = aliased(MT_CODE_TYPE_MST, name="T1")
    T2 = aliased(MT_CODE_MST, name="T2")

    query = session.query(T2.code_nm).select_from(T1).join(T2, T1.code_type_id==T2.code_type_id).filter(
      T1.code_type_id=="schd_status", T1.use_yn=="Y",
      T2.code_id==str(root.schd_status), T2.use_yn=="Y"
    ).first()

    code_name = None
    if query is not None:
      code_name = query[0]

    return code_name

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