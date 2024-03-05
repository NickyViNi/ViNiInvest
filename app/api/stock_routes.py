from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..models import db, Stock
from ..forms import TransactionForm

stock_routes = Blueprint("stocks", __name__)

@stock_routes.route("/")
@login_required
def stocks():
    """Get all stocks"""
    stocks = Stock.query.all()
    return [stock.to_dict() for stock in stocks], 200

@stock_routes.route("/<int:id>")
@login_required
def get_stock(id):
    """Get a specific stock detal by id"""
    stock = Stock.query.get(id)

    if not stock:
        return { "message": "Stock couldn't be found" }, 404

    return stock.to_dict(prices=True)

@stock_routes.route("/<int:id>")
@login_required
def stock_order(id):
    """Buy or sell a stock by stock id"""
    stock = Stock.query.get(id)
