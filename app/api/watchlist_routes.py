from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..models import db, Watchlist
from ..forms import WatchlistForm

watchlist_routes = Blueprint("watchlists", __name__)

@watchlist_routes.route("/")
@login_required
def watchlists():
    """Get all watchlists owned by current user"""
    user_watchlists = [watchlist.to_dict() for watchlist in current_user.watchlists]
    return user_watchlists


@watchlist_routes.route("/<int:id>")
@login_required
def get_watchlist():
    pass


@watchlist_routes.route("/", methods=["POST"])
@login_required
def create_watchlist():
    pass

@watchlist_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_watchlist():
    pass

@watchlist_routes.route("/", methods=["DELETE"])
@login_required
def delete_watchlist():
    pass
