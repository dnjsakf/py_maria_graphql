import graphene
from graphene import relay

__all__ = [
  'BaseConnection'
]

class BaseConnection(relay.Connection):
  class Meta:
    abstract = True
  
  total_count = graphene.Int()
  edge_count = graphene.Int()
    
  def resolve_total_count(root, info, **input):
    if root.total_count is not None:
      return root.total_count
    else:
      return len(root.iterable)
  
  def resolve_edge_count(root, info, **input):
    return len(root.edges)
