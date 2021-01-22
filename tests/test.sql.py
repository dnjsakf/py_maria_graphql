import dotenv
from flask import Flask

from app.models import init_db
from app.models.scott import DeptModel, EmpModel
from app.models.lotto import IF_LOTTO_PRZWIN_MST

dotenv.load_dotenv(dotenv_path=".env")

app = Flask(__name__)
app.config.from_object("app.config.flask.DevelopmentConfig")

db = init_db(app)

# data = lambda r: {c.name: str(getattr(r, c.name)) for c in r.__table__.columns}
def row2dict(row):
  d = {}
  for column in row.__table__.columns:
      d[column.name] = str(getattr(row, column.name))
  return d

with app.app_context():
  # db.drop_all()
  db.create_all()

  records = IF_LOTTO_PRZWIN_MST.query.all()

  for record in records:
    print( row2dict(record) )

  # dept = DeptModel(deptno=10, dname="ACCOUNTING", location="NEW YORK")
  # emp = EmpModel(empno=7839, ename="KING", job="PRESIDENT", mgr=None, hiredate="1981-11-17", sal=5000, comm=None, deptno=10)

  # db.session.add(dept)
  # db.session.commit()

  # db.session.add(emp)
  # db.session.commit()

  

app.run(port=3000)
