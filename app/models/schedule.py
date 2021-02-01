from  datetime import datetime

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

  mst_id          = Column(String(50), ForeignKey("WK_SCHD_MST.schd_id", ondelete='CASCADE'), nullable=True, comment="마스터스케줄ID")

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

  mst_id          = Column(String(50), ForeignKey("WK_SCHD_MST.schd_id", ondelete='CASCADE'), nullable=True, comment="마스터스케줄ID")

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

  mst_id          = Column(String(50), ForeignKey("WK_SCHD_MST.schd_id", ondelete='CASCADE'), nullable=True, comment="마스터스케줄ID")

class WK_SCHD_MST(Base):
  __tablename__ = "WK_SCHD_MST"
  __table_args__ = (
    dict(
      comment="스케줄마스터"
    )
  )

  schd_id          = Column(String(50), primary_key=True, comment="스케줄ID")
  schd_type        = Column(String(10), nullable=False, comment="스케줄타입") # date, interval, crontab
  schd_status      = Column(Integer, default=1, comment="스케줄상태") # 0:등록, 1:대기, 2:진행중, 3:완료, 9오류
  
  exec_msg        = Column(String(500), comment="실행메시지")

  reg_user        = Column(String(50), default="SYSTEM", comment="생성자")
  reg_dttm        = Column(String(14), comment="생성일")
  upd_user        = Column(String(50), comment="수정자")
  upd_dttm        = Column(String(14), comment="수정일")
  
  date            = relationship(
                      "WK_SCHD_DATE",
                      primaryjoin=("WK_SCHD_DATE.mst_id == WK_SCHD_MST.schd_id"),
                      remote_side="WK_SCHD_DATE.mst_id",
                      cascade="all,delete",
                      backref="master"
                    )
  interval        = relationship(
                      "WK_SCHD_INTV",
                      primaryjoin=("WK_SCHD_INTV.mst_id == WK_SCHD_MST.schd_id"),
                      remote_side="WK_SCHD_INTV.mst_id",
                      cascade="all,delete",
                      backref="master"
                    )
  crontab         = relationship(
                      "WK_SCHD_CRON",
                      primaryjoin=("WK_SCHD_CRON.mst_id == WK_SCHD_MST.schd_id"),
                      remote_side="WK_SCHD_CRON.mst_id",
                      cascade="all,delete",
                      backref="master"
                    )
