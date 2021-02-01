from .session import session, engine
from .base import Base

def init_db():
  from ..models.common import (
    MN_MENU_MST,
    MT_CODE_TYPE_MST,
    MT_CODE_MST
  )
  from ..models.scott import (
    EmpModel, DeptModel
  )
  from ..models.lotto import (
    IF_LOTTO_PRZWIN_MST
  )
  from ..models.schedule import (
    WK_SCHD_MST,
    WK_SCHD_DATE,
    WK_SCHD_INTV,
    WK_SCHD_CRON
  )

  Base.metadata.create_all(bind=engine)


  from datetime import datetime

  mn0000 = MN_MENU_MST(
    menu_id="MN0000",
    menu_name="메인",
    menu_type="main",
    link="/",
    icon="Home",
    use_yn="Y",
    sort_order=0,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S")
  )
  session.merge(mn0000)

  mn1000 = MN_MENU_MST(
    menu_id="MN1000",
    menu_name="환경설정",
    menu_type="setting",
    link="/setting",
    icon="Settings",
    use_yn="Y",
    sort_order=99991000,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S")
  )
  mn1100 = MN_MENU_MST(
    menu_id="MN1100",
    menu_name="메뉴설정",
    menu_type="setting",
    link="/setting/menus",
    icon="Ballot",
    use_yn="Y",
    sort_order=99991100,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S"),
    pmenu_id="MN1000"
  )
  mn1200 = MN_MENU_MST(
    menu_id="MN1200",
    menu_name="사용자설정",
    menu_type="setting",
    link="/setting/users",
    icon="AccountCircle",
    use_yn="Y",
    sort_order=99991200,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S"),
    pmenu_id="MN1000"
  )
  mn1210 = MN_MENU_MST(
    menu_id="MN1210",
    menu_name="권한설정",
    menu_type="setting",
    link="/setting/users/auth",
    icon="Settings",
    use_yn="Y",
    sort_order=99991210,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S"),
    pmenu_id="MN1200"
  )
  mn1300 = MN_MENU_MST(
    menu_id="MN1300",
    menu_name="스케줄관리",
    menu_type="setting",
    link="/setting/sched",
    icon="LocalAtm",
    use_yn="Y",
    sort_order=99991300,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S"),
    pmenu_id="MN1000"
  )
  mn1400 = MN_MENU_MST(
    menu_id="MN1400",
    menu_name="공통코드관리",
    menu_type="setting",
    link="/setting/code",
    icon="LocalAtm",
    use_yn="Y",
    sort_order=99991400,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S"),
    pmenu_id="MN1000"
  )
  
  session.merge(mn1000)
  session.merge(mn1100)
  session.merge(mn1200)
  session.merge(mn1210)
  session.merge(mn1300)
  session.merge(mn1400)
  
  mn2000 = MN_MENU_MST(
    menu_id="MN2000",
    menu_name="로또",
    menu_type="lotto",
    link="/lotto",
    icon="LocalAtm",
    use_yn="Y",
    sort_order=2000,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S")
  )
  
  session.merge(mn2000)
  session.commit()

  schd_type = MT_CODE_TYPE_MST(
    code_type_id="schd_type",
    code_type_nm="스케줄타입",
    code_type_desc="스케줄타입",
    use_yn="Y",
    sort_order=1000,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S")
  )
  schd_type.code.append(MT_CODE_MST(
    code_id="date",
    code_nm="일회성",
    code_desc="한번만 실행",
    use_yn="Y",
    sort_order=1000,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S")
  ))
  schd_type.code.append(MT_CODE_MST(
    code_id="interval",
    code_nm="주기성",
    code_desc="주기성",
    use_yn="Y",
    sort_order=2000,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S")
  ))
  schd_type.code.append(MT_CODE_MST(
    code_id="crontab",
    code_nm="크론탭",
    code_desc="크론탭",
    use_yn="Y",
    sort_order=3000,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S")
  ))
  session.merge(schd_type)
  session.commit()
  
  