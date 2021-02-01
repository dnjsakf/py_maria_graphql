import graphene
from graphql_relay.node.node import from_global_id

from .common import *
from .lotto import *
from .schedule import *
from .scott import *

class RootMutation(
    EmpMutation,
    ScheduleMutation,
    CodeMutation,
    graphene.ObjectType
  ):
  pass