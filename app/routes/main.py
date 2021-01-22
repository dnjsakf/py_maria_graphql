from flask import Blueprint

bp = Blueprint("main", __name__, url_prefix="/")


@bp.route("", methods=["GET","POST"])
@bp.route("<path:path>", methods=["GET","POST"])
def view_main(path=None):
  return '''
  <html>
    <head>
    </head>
    <body>
      <h3>Hello, World!!!</h3>
    </body>
  </html>
  '''