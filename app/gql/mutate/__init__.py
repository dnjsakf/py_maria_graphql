import graphene
from graphql_relay.node.node import from_global_id

from .lotto import *
from .menus import *
from .schedule import *
from .scott import *

class RootMutation(
    EmpMutation,
    ScheduleMutation,
    graphene.ObjectType
  ):
  pass