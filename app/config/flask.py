class BaseConfig(object):
  TESTING = False
  JSONIFY_PRETTYPRINT_REGULAR = True

class ProductionConfig(BaseConfig):
  SQLALCHEMY_DATABASE_URI="mariadb+pymsql://dochi:dochi@127.0.01/SCOTT?charset=utf8mb4"

class DevelopmentConfig(BaseConfig):
  SQLALCHEMY_DATABASE_URI="mariadb+mysqldb://dochi:dochi@127.0.01/SCOTT?charset=utf8mb4"

  DEV_SERVER_HOST = "0.0.0.0"
  DEV_SERVER_PORT = 3000
  DEV_SERVER_THREADED = True

class TestingConfig(BaseConfig):
  TESTING = True
