from graphene import relay

__all__ = [
  'ParentCodeNode',
  'CodeNode',
  'MenuNode'
]

class ParentCodeNode(relay.Node):
  class Meta:
    name = 'ParentCodeNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"

class CodeNode(relay.Node):
  class Meta:
    name = 'CodeNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"

class MenuNode(relay.Node):
  class Meta:
    name = 'MenuNode'

  @staticmethod
  def to_global_id(type_, id):
    return f"{type_}:{id}"
