from .base import BaseConnection
from ..types import MenuType

__all__ = [
  'MenuConnection'
]

class MenuConnection(BaseConnection):
  class Meta:
    node = MenuType
