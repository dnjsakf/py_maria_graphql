from graphene import relay

class EmpNode(relay.Node):
  class Meta:
    name = 'EmpNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"

class MenuNode(relay.Node):
  class Meta:
    name = 'MenuNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"

class LottoPrzwinNode(relay.Node):
  class Meta:
    name = 'LottoPrzwinNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"
