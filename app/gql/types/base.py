import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

__all__ = [
  'BaseSQLAlchemyObjectType'
]

class CountableConnection(relay.Connection):
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

class BaseSQLAlchemyObjectType(SQLAlchemyObjectType):
  class Meta:
    abstract = True

  @classmethod
  def __init_subclass_with_meta__(cls, model=None, registry=None, skip_registry=False,
                                  only_fields=(), exclude_fields=(), connection=None,
                                  use_connection=None, interfaces=(), id=None, **options):
                                  
      # Force it to use the countable connection
      countable_conn = connection or CountableConnection.create_type(
          "{}CountableConnection".format(model.__name__),
          node=cls)

      print( countable_conn )
      print( interfaces )
      print( id )

      super(BaseSQLAlchemyObjectType, cls).__init_subclass_with_meta__(
        model, 
        registry, 
        skip_registry,
        only_fields,
        exclude_fields, 
        countable_conn,
        use_connection, 
        interfaces, 
        id,
        **options
      )