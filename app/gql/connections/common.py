from .base import BaseConnection
from ..types.common import ParentCodeType, CodeType, MenuType

__all__ = [
  'ParentCodeConnection',
  'CodeConnection',
  'MenuConnection'
]

class ParentCodeConnection(BaseConnection):
  class Meta:
    node = ParentCodeType

class CodeConnection(BaseConnection):
  class Meta:
    node = CodeType

class MenuConnection(BaseConnection):
  class Meta:
    node = MenuType
