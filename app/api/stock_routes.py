from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..models import db, Stock, Transaction, Portfolio, Portfolio_stock, Analysis
from ..forms import TransactionForm, AnalysisForm

stock_routes = Blueprint("stocks", __name__)

@stock_routes.route("/")
@login_required
def stocks():
    """Get all stocks"""
    stocks = Stock.query.all()
    return [stock.to_dict(prices=True) for stock in stocks], 200

@stock_routes.route("/<int:id>")
@login_required
def get_stock(id):
    """Get a specific stock detal by id"""
    stock = Stock.query.get(id)

    if not stock:
        return { "message": "Stock couldn't be found" }, 404

    result = stock.to_dict(prices=True, transactions=True)
    filter_orders = []
    for order in result["transactions"]:
        if order["portfolio"]["user_id"] == current_user.id:
            filter_orders.append(order)
    result["transactions"] = filter_orders

    return result


@stock_routes.route("/<int:stock_id>/portfolios/<int:portfolio_id>", methods=["POST"])
@login_required
def stock_order(stock_id, portfolio_id):
    """Buy or sell a stock by stock id and add the order to a specific portfolio"""
    form = TransactionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    stock = Stock.query.get(stock_id)
    portfolio = Portfolio.query.get(portfolio_id)
    portfolio_stock = Portfolio_stock.query.filter(Portfolio_stock.portfolio_id == portfolio_id).filter(Portfolio_stock.stock_id == stock_id).one_or_none()

    if form.validate_on_submit():

        if not stock:
            return { "message": "Stock couldn't be found" }, 404
        if not portfolio:
            return { "message": "Stock couldn't be found" }, 404
        if float(form.data["shares"]) < 0:
            return { "shares": "Shares can't be negative number" }, 400
        if (not portfolio_stock) and form.data["type"].lower() == "sell":
            return {"message": "You don't have any share of this stock to sell"}
        if portfolio_stock and form.data["type"].lower() == "sell" and portfolio_stock.quantity < form.data["shares"]:
            return {"message": "You don't have enough shares of this stock to sell"}
        if form.data["type"].lower() == "buy" and portfolio.fake_money_balance < (form.data["shares"] * stock.to_dict()["newest_price"]["close_price"]):
            return {"message": "Sorry, there is no sufficient balance"}

        new_transaction = Transaction(
            portfolio_id = portfolio_id,
            stock_id = stock_id,
            shares = form.data["shares"],
            type = form.data["type"],
            is_completed = False,
            price_per_unit = stock.to_dict()["newest_price"]["close_price"]
        )

        """update portfolio money balance when "buy"""
        # if new_transaction.type.lower() == "sell":
        #     portfolio.fake_money_balance += float(format(new_transaction.shares * new_transaction.price_per_unit), "0.2f")
        if new_transaction.type.lower() == "buy":
            portfolio.fake_money_balance -= float(new_transaction.shares * new_transaction.price_per_unit)

        db.session.add(new_transaction)
        db.session.commit()

        # return stock.to_dict(prices=True, transactions=True)
        result = stock.to_dict(prices=True, transactions=True)
        filter_orders = []
        for order in result["transactions"]:
            if order["portfolio"]["user_id"] == current_user.id:
                filter_orders.append(order)
        result["transactions"] = filter_orders
        return result

    return form.errors, 400

@stock_routes.route("/<int:stock_id>/analysis")
@login_required
def analysis(stock_id):
    """"Get all analyses"""
    analyses = Analysis.query.all(stock_id)

    return [a.to_dict() for a in analyses], 200


@stock_routes.route("/<int:stock_id>/analysis", methods=["POST"])
@login_required
def create_analysis(stock_id):
    """Create an Analysis"""
    form = AnalysisForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        stock = Stock.query.get(stock_id)

        if not stock:
            return {"message": "Stock couldn't be found"}, 404

        new_analysis = Analysis(
            content=form.data["content"],
            recommendation=form.data["recommendation"],
            stock_id=stock_id,
            user_id=current_user.id
        )

        db.session.add(new_analysis)
        db.session.commit()

        return new_analysis.to_dict(), 200

    return form.errors, 400
