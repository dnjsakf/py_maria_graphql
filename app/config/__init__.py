class BaseConfig(object):
  TESTING = False
  JSONIFY_PRETTYPRINT_REGULAR = True

class ProductionConfig(BaseConfig):
  MARIA_URI = 'mysql://user@localhost/foo'

class DevelopmentConfig(BaseConfig):
  DEV_SERVER_HOST = "0.0.0.0"
  DEV_SERVER_PORT = 3000
  DEV_SERVER_THREADED = True

class TestingConfig(BaseConfig):
  TESTING = True
