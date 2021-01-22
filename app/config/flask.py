class BaseConfig(object):
  TESTING = False
  SECRET_KEY = "Dochi's GraphQL"
  JSONIFY_PRETTYPRINT_REGULAR = True
  SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(BaseConfig):
  SQLALCHEMY_DATABASE_URI="mysql+mysqldb://dochi:dochi@127.0.0.1/scott?charset=utf8mb4"

class DevelopmentConfig(BaseConfig):
  # SQLALCHEMY_DATABASE_URI="mysql+mysqldb://dochi:dochi@127.0.0.1/scott?charset=utf8mb4"
  SQLALCHEMY_DATABASE_URI="oracle://LOTTO:lotto12!#@127.0.0.1:1521/CAMPDB"

  DEV_SERVER_HOST = "0.0.0.0"
  DEV_SERVER_PORT = 3000
  DEV_SERVER_THREADED = True

class TestingConfig(BaseConfig):
  TESTING = True
