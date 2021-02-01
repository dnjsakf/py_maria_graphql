from .base import BaseConnection
from ..types.scott import EmpType

__all__ = [
  'EmpConnection'
]

class EmpConnection(BaseConnection):
  class Meta:
    node = EmpType
