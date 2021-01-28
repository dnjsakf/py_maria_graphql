from graphene import relay

__all__ = [
  'EmpNode'
]

class EmpNode(relay.Node):
  class Meta:
    name = 'EmpNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"
