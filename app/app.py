import os
import dotenv

from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView

APP_PATH = os.path.abspath(os.path.dirname(__file__))

def create_app():
  app = Flask(__name__)
  app.static_url_path = "/static/"
  app.static_folder = os.path.join(APP_PATH, "static")
  app.template_folder = os.path.join(APP_PATH, "templates")
  app.url_map.strict_slashes = False
  
  # Set Environment Variables
  dotenv.load_dotenv(dotenv_path=".env")
  
  # Set Configuration Default
  FLASK_ENV = os.environ.get("FLASK_ENV", "production").lower()
  if FLASK_ENV == "development":
    app.config.from_object("app.config.flask.DevelopmentConfig")
  else:
    app.config.from_object("app.config.flask.ProductionConfig")

  # Set Configuration for SECRET_KEY
  SECRET_KEY = app.config.get("SECRET_KEY") or os.environ.get("SECRET_KEY", None)
  if not SECRET_KEY:
    raise ValueError("No SECRET_KEY set for Flask application")
  app.config["SECRET_KEY"] = SECRET_KEY
  
  with app.app_context():
    handle_middleware()
    
  return app

def handle_middleware():
  from flask import current_app as app

  # Set CORS
  CORS(app=app, resources={
    r"*": { "origin": "*" }
  })
  
  # Set GraphQL
  from app.gql import schema
  
  app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
      'graphql',
      schema=schema,
      graphiql=True
    )
  )