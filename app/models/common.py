from sqlalchemy import (
  ForeignKeyConstraint, PrimaryKeyConstraint,
  Column, String, Integer, ForeignKey
)
from sqlalchemy.orm import relationship, backref
from ..database.base import Base

class WK_SCHD_CRON(Base):
  __tablename__ = "WK_SCHD_CRON"
  __table_args__ = (
    dict(
      comment="스케줄_크론탭"
    )
  )

  schd_id          = Column(String(50), primary_key=True, comment="스케줄ID")
  crontab         = Column(String(50), nullable=False, comment="크론탭")

  reg_user        = Column(String(50), comment="생성자")
  reg_dttm        = Column(String(14), comment="생성일")
  upd_user        = Column(String(50), comment="수정자")
  upd_dttm        = Column(String(14), comment="수정일")

class WK_SCHD_INTV(Base):
  __tablename__ = "WK_SCHD_INTV"
  __table_args__ = (
    dict(
      comment="스케줄_주기성"
    )
  )

  schd_id         = Column(String(50), primary_key=True, comment="스케줄ID")
  weeks           = Column(Integer, default=0, comment="주")
  days            = Column(Integer, default=0, comment="일")
  hours           = Column(Integer, default=0, comment="시")
  minutes         = Column(Integer, default=0, comment="분")
  seconds         = Column(Integer, default=0, comment="초")
  start_date      = Column(String(14), comment="시작일")
  end_date        = Column(String(14), comment="종료일")

  reg_user        = Column(String(50), comment="생성자")
  reg_dttm        = Column(String(14), comment="생성일")
  upd_user        = Column(String(50), comment="수정자")
  upd_dttm        = Column(String(14), comment="수정일")

class WK_SCHD_DATE(Base):
  __tablename__ = "WK_SCHD_DATE"
  __table_args__ = (
    dict(
      comment="스케줄_일회성"
    )
  )

  schd_id         = Column(String(50), primary_key=True, comment="스케줄ID")
  datetime        = Column(String(14), comment="실행일시")
  date            = Column(String(8), comment="실행일")
  time            = Column(String(6), comment="실행시간")

  reg_user        = Column(String(50), comment="생성자")
  reg_dttm        = Column(String(14), comment="생성일")
  upd_user        = Column(String(50), comment="수정자")
  upd_dttm        = Column(String(14), comment="수정일")


class WK_SCHD_MST(Base):
  __tablename__ = "WK_SCHD_MST"
  __table_args__ = (
    dict(
      comment="스케줄마스터"
    )
  )

  schd_id          = Column(String(50), primary_key=True, comment="스케줄ID")
  schd_type        = Column(String(10), nullable=False, comment="스테줄타입") # date, interval, crontab
  schd_status      = Column(Integer, default=1, comment="스케줄상태") # 0:등록, 1:대기, 2:진행중, 3:완료, 9오류
  
  exec_msg        = Column(String(500), comment="실행메시지")

  reg_user        = Column(String(50), comment="생성자")
  reg_dttm        = Column(String(14), comment="생성일")
  upd_user        = Column(String(50), comment="수정자")
  upd_dttm        = Column(String(14), comment="수정일")
  
  date_schd_id     = Column(String(50), ForeignKey("WK_SCHD_DATE.schd_id"), nullable=True, comment="일회성스케줄ID")
  date            = relationship(
                      "WK_SCHD_DATE",
                      primaryjoin=("WK_SCHD_DATE.schd_id == WK_SCHD_MST.date_schd_id"),
                      remote_side="WK_SCHD_DATE.schd_id"
                    )
                    
  intv_schd_id     = Column(String(50), ForeignKey("WK_SCHD_INTV.schd_id"), nullable=True, comment="주기성스케줄ID")
  interval        = relationship(
                      "WK_SCHD_INTV",
                      primaryjoin=("WK_SCHD_INTV.schd_id == WK_SCHD_MST.intv_schd_id"),
                      remote_side="WK_SCHD_INTV.schd_id"
                    )
  cron_schd_id     = Column(String(50), ForeignKey("WK_SCHD_CRON.schd_id"), nullable=True, comment="크론탭스케줄ID")
  crontab         = relationship(
                      "WK_SCHD_CRON",
                      primaryjoin=("WK_SCHD_CRON.schd_id == WK_SCHD_MST.cron_schd_id"),
                      remote_side="WK_SCHD_CRON.schd_id"
                    )

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
Refs.
  https://www.zerocho.com/category/React/post/5fa63fc6301d080004c4e32b
  https://github.com/dnjsakf/pf_skill/blob/master/src/layouts/Main/Main.js

'''