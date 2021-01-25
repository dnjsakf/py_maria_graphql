from .session import session, engine
from .base import Base

def init_db():
  from ..models.common import (
    MN_MENU_MST
  )
  from ..models.scott import (
    EmpModel, DeptModel
  )
  from ..models.lotto import (
    IF_LOTTO_PRZWIN_MST
  )

  Base.metadata.create_all(bind=engine)


  from datetime import datetime

  mn0000 = MN_MENU_MST(
    menu_id="MN0000",
    menu_name="메인",
    menu_type="main",
    link="/",
    icon="Settings",
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
    sort_order=1000,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S")
  )
  mn1100 = MN_MENU_MST(
    menu_id="MN1100",
    menu_name="메뉴설정",
    menu_type="setting",
    link="/setting/menus",
    icon="Settings",
    use_yn="Y",
    sort_order=1100,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S"),
    pmenu_id="MN1000"
  )
  mn1110 = MN_MENU_MST(
    menu_id="MN1110",
    menu_name="사이드바메뉴",
    menu_type="setting",
    link="/setting/menus/sidebar",
    icon="Settings",
    use_yn="Y",
    sort_order=1110,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S"),
    pmenu_id="MN1100"
  )

  session.merge(mn1000)
  session.merge(mn1100)
  session.merge(mn1110)
  
  
  mn2000 = MN_MENU_MST(
    menu_id="MN2000",
    menu_name="로또",
    menu_type="lotto",
    link="/lotto",
    icon="Settings",
    use_yn="Y",
    sort_order=2000,
    reg_user="admin",
    reg_dttm=datetime.now().strftime("%Y%m%d%H%M%S")
  )
  
  session.merge(mn2000)

  session.commit()
  