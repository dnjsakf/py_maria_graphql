from .session import session, engine
from .base import Base

def init_db():
  from ..models.scott import (
    EmpModel, DeptModel
  )
  from ..models.lotto import (
    IF_LOTTO_PRZWIN_MST
  )

  Base.metadata.create_all(bind=engine)
