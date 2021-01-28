from graphene import relay

__all__ = [
  'DateScheduleNode',
  'IntervalScheduleNode',
  'CrontabScheduleNode',
  'ScheduleNode'
]

class DateScheduleNode(relay.Node):
  class Meta:
    name = 'DateScheduleNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"

class IntervalScheduleNode(relay.Node):
  class Meta:
    name = 'IntervalScheduleNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"
    
class CrontabScheduleNode(relay.Node):
  class Meta:
    name = 'CrontabScheduleNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"

class ScheduleNode(relay.Node):
  class Meta:
    name = 'ScheduleNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"