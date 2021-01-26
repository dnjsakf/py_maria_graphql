from sqlalchemy import Column, String, Integer, DateTime
from ..database.base import Base

class IF_LOTTO_PRZWIN_MST(Base):
  __tablename__ = "IF_LOTTO_PRZWIN_MST"
  
  drwt_no	            = Column(Integer, primary_key=True) # PK -> String
  drwt_no_date		    = Column(DateTime(8))
  drwt_no1            = Column(Integer)
  drwt_no2            = Column(Integer)
  drwt_no3            = Column(Integer)
  drwt_no4            = Column(Integer)
  drwt_no5            = Column(Integer)
  drwt_no6            = Column(Integer)
  drwt_no_bnus        = Column(Integer)
  frst_accum_amount	  = Column(Integer)
  frst_przwin_amount  = Column(Integer)
  frst_przwin_co      = Column(Integer)
  rtn_val             = Column(String(500))
  reg_user            = Column(String(50))
  reg_dttm            = Column(String(14))
  upd_user            = Column(String(50))
  upd_dttm            = Column(String(14))
  
  def __repr__(self):
    return '<IF_LOTTO_PRZWIN_MST %r>' % self.drwt_no
