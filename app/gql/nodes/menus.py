from graphene import relay

__all__ = [
  'MenuNode'
]

class MenuNode(relay.Node):
  class Meta:
    name = 'MenuNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"
