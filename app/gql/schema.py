from graphene import Schema

from .types import types
from .query import RootQuery
from .mutate import RootMutation

schema = Schema(
  query=RootQuery,
  mutation=RootMutation,
  types=types
)
