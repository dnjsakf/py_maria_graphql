def init_route():
  from flask import current_app as app

  from .main import bp as bp_main
  app.register_blueprint(bp_main, url_prefix="/")