from flask import Blueprint, render_template

bp = Blueprint("main", __name__, url_prefix="/")

@bp.route("")
@bp.route("<path:path>")
def view_main(path=None):
  return render_template("index.html")
