from .base import BaseConnection
from ..types.lotto import (
  LottoPrzwinType
)

__all__ = [
  'LottoPrzwinConnection'
]

class LottoPrzwinConnection(BaseConnection):
  class Meta:
    node = LottoPrzwinType

  def resolve_total_count(root, info, **input):
    if root.total_count is not None:
      return root.total_count
    else:
      return root.length
