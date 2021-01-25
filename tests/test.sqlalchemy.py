from pprint import pprint

from app.database import init_db, session
from app.models.common import MN_MENU_MST

from sqlalchemy import select, func, case, asc, desc, literal
from sqlalchemy.orm import aliased

init_db()

class TestSQLAlchemy(object):  
  def __init__(self):
    print("SQLAlchemy 테스트")
    print("="*40)
    for attrname in dir(self):
      testcase = getattr(self, attrname)
      if attrname.startswith("test") and callable(testcase):
        print("="*40)
        print( testcase.__doc__ )
        print("="*40)
        try:
          testcase()
        except Exception as e:
          print("Error: "+str(e))
        print("")
        print("="*40)

  def test_case_1(self):
    ''' 재귀호출 - 메뉴목록 '''
    
    src = aliased(MN_MENU_MST, name="SRC")
    with_rec_menus = session.query(src.menu_id, src.menu_name, src.pmenu_id, src.menu_type, src.sort_order) \
      .filter(src.pmenu_id==None) \
      .cte(recursive=True, name="REC_MENUS")

    cte = aliased(with_rec_menus, name="CTE")

    rec = with_rec_menus.union_all(
      session.query(src.menu_id, src.menu_name, src.pmenu_id, src.menu_type, src.sort_order) \
        .join(cte, cte.c.menu_id == src.pmenu_id)
    )

    t2 = aliased(rec, name="TGT")
    column_menu_sort = func.row_number().over(partition_by="menu_type", order_by=asc("sort_order")).label('rn')
    column_min_order = func.min("sort_order").label("asdf")

    query = session.query(
        t2,
        column_menu_sort,
        column_min_order
      ) \
      .select_from(t2) \
      .group_by("menu_type", "menu_id") \
      .order_by(asc("asdf"))
    
    # print( query )

  def test_case_2(self):
    ''' 재귀호출 - 2 '''

    hierarchy = session.query(
      MN_MENU_MST.menu_id,
      MN_MENU_MST.menu_name,
      MN_MENU_MST.menu_type,
      MN_MENU_MST.sort_order,
      literal(1).label('level')
      ) \
      .filter(MN_MENU_MST.pmenu_id==None) \
      .filter(MN_MENU_MST.use_yn=="Y") \
      .cte(recursive=True, name="REC_MENUS")
    
    child = aliased(MN_MENU_MST, name="c")
    parent = aliased(hierarchy, name="p")

    hierarchy = hierarchy.union_all(
      session.query(
        child.menu_id,
        child.menu_name,
        child.menu_type,
        child.sort_order,
        (parent.c.level + 1).label("level")
      ) \
      .filter(child.pmenu_id == parent.c.menu_id)
    )

    query = session.query(
        child,
        func.min(hierarchy.c.sort_order).over(partition_by=hierarchy.c.menu_type).label("sort_type")
      ) \
      .select_entity_from(hierarchy)

    for q in query.all():
      print(q)

    # print( str(query) )

# 테스트 실행
TestSQLAlchemy()