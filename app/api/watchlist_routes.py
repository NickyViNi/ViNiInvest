from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..models import db, Watchlist, Watchlist_stock, Stock
from ..forms import WatchlistForm

watchlist_routes = Blueprint("watchlists", __name__)

@watchlist_routes.route("/")
@login_required
def watchlists():
    """Get all watchlists owned by current user"""
    user_watchlists = [watchlist.to_dict() for watchlist in current_user.watchlists]
    return user_watchlists, 200


@watchlist_routes.route("/<int:id>")
@login_required
def get_watchlist(id):
    """Get all stocks in a specific by id owned by current user"""
    watchlist = Watchlist.query.get(id)

    if not watchlist:
        return {"message": "Watchlist couldn't be found"}, 404
    if watchlist.user_id != current_user.id:
        return redirect("/api/auth/forbidden")

    return watchlist.to_dict(watchlist_stocks=True), 200


@watchlist_routes.route("/", methods=["POST"])
@login_required
def create_watchlist():
    """create a new watchlist"""
    form = WatchlistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_watchlist = Watchlist(
            name = form.data["name"],
            user_id = current_user.id
        )
        db.session.add(new_watchlist)
        db.session.commit()

        return new_watchlist.to_dict(), 201
    return form.errors, 400


@watchlist_routes.route("/<int:watchlist_id>/stocks/<int:stock_id>", methods=["POST"])
@login_required
def add_stock_to_watchlist(watchlist_id, stock_i):
    """addind a stock into a watchlist by id"""
    watchlist = Watchlist.query.get(watchlist_id)
    new_watchlist_stock = Watchlist_stock (
        watchlist_id = watchlist_id,
        stock_id = stock_i
    )
    db.session.add(new_watchlist_stock)
    db.session.commit()
    return watchlist.to_dict(watchlist_stocks=True), 201


@watchlist_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_watchlist(id):
    """update a watchlist name by id"""
    form = WatchlistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    watchlist = Watchlist.query.get(id)

    if not watchlist:
        return {"message": "Watchlist couldn't be found"}, 404
    if watchlist.user_id != current_user.id:
        return redirect("/api/auth/forbidden")

    if form.validate_on_submit():
        if form.data["name"] != watchlist.name:
            watchlist_in_db = Watchlist.query.filter(Watchlist.name == form.data["name"]).first()
            if watchlist_in_db:
                return {"name":  "This name is already taken"}, 409
            watchlist.name = form.data["name"]
            db.session.commit()
        return watchlist.to_dict(watchlist_stocks=True), 200
    return form.errors, 400


@watchlist_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_watchlist(id):
    """delete a watchlist by id"""
    watchlist = Watchlist.query.get(id)

    if not watchlist:
        return {"message": "Watchlist couldn't be found"}, 404
    if watchlist.user_id != current_user.id:
        return redirect("/api/auth/forbidden")

    db.session.delete(watchlist)
    db.session.commit()

    return {"message": "Successfully deleted watchlist"}, 200


@watchlist_routes.route("/<int:watchlist_id>/stocks/<int:stock_id>", methods=["DELETE"])
@login_required
def delete_watchlist(watchlist_id, stock_id):
    """delete a stock from a watchlist by id"""
    watchlist = Watchlist_stock.query.get(watchlist_id)
    stock = Stock.query.get(stock_id)
    if not watchlist:
        return {"message": "Watchlist couldn't be found"}, 404
    if not stock:
        return {"message": "Stock couldn't be found"}, 404
    watchlist_stock = Watchlist_stock.query.filter(Watchlist_stock.watchlist_id == watchlist.id).filter(Watchlist_stock.stock_id == stock.id)
    if not watchlist_routes:
        return {"message": "Stock couldn't be found in this watchlist"}, 404

    db.session.delete(watchlist_stock)
    db.session.commit()

    return {"message": "Successfully remove the stock from this watchlist"}, 200
