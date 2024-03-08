from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..forms import WatchlistForm

watchlist_routes = Blueprint("watchlists", __name__)

@watchlist_routes.route("/")
@login_required
def watchlists():
    pass
