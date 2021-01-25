from sqlalchemy import Column, String, Integer, ForeignKeyConstraint, ForeignKey
from sqlalchemy.orm import relationship, backref
from ..database.base import Base

class MN_MENU_MST(Base):
  __tablename__ = "MN_MENU_MST"
  __table_args__ = (
    # ForeignKeyConstraint(['menu_id'], ['MN_MENU_MST.menu_id']),
    dict(
      comment="메뉴마스터"
    )
  )

  menu_id     = Column(String(50), primary_key=True, comment="메뉴ID")
  menu_name   = Column(String(50), comment="메뉴명")
  menu_type   = Column(String(10), comment="메뉴타입")
  
  link        = Column(String(100), comment="연결URL")
  icon        = Column(String(30), comment="아이콘")
  
  use_yn      = Column(String(1), default="Y", comment="사용여부")
  sort_order  = Column(Integer, default=0, comment="정렬순서")

  reg_user    = Column(String(50), comment="생성자")
  reg_dttm    = Column(String(14), comment="생성일")
  upd_user    = Column(String(50), comment="수정자")
  upd_dttm    = Column(String(14), comment="수정일")
  
  pmenu_id    = Column(String(50), ForeignKey("MN_MENU_MST.menu_id"), nullable=True)
  pmenu       = relationship(
                  "MN_MENU_MST",
                  primaryjoin=("MN_MENU_MST.menu_id == MN_MENU_MST.pmenu_id"),
                  remote_side="MN_MENU_MST.menu_id",
                  backref=backref("cmenu")
                )

'''
https://www.zerocho.com/category/React/post/5fa63fc6301d080004c4e32b
https://github.com/dnjsakf/pf_skill/blob/master/src/layouts/Main/Main.js
'''