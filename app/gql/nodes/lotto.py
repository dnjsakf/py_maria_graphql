from graphene import relay

__all__ = [
  'LottoPrzwinNode'
]

class LottoPrzwinNode(relay.Node):
  class Meta:
    name = 'LottoPrzwinNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"
