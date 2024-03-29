from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..models import db, Portfolio, Transaction, Portfolio_stock
from ..forms import PortfolioForm

portfolio_routes = Blueprint("portfolios", __name__)

@portfolio_routes.route("/")
@login_required
def portfolios():
    """Get all portfolios owned by current user"""
    user_portfolios = [portfolio.to_dict(portfolio_stocks=True) for portfolio in current_user.user_portfolios]
    return {"Portfolios": user_portfolios}, 200


@portfolio_routes.route("/<int:id>")
@login_required
def portfolio(id):
    """Get specific portfolio's detail by id owned by current user"""
    portfolio = Portfolio.query.get(id)

    if not portfolio:
        return { "message": "Portfolio couldn't be found" }, 404

    if current_user.id != portfolio.user_id:
        return redirect("/api/auth/forbidden")

    return portfolio.to_dict(transactions=True, portfolio_stocks=True), 200


@portfolio_routes.route("/", methods=["POST"])
@login_required
def create_portfolio():
    form = PortfolioForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        result = Portfolio.validate(form.data, current_user.id)
        owner_id = current_user.to_dict()["id"]

        if (result != True):
            return result

        new_portfolio = Portfolio(
            name = form.data["name"],
            user_id = owner_id,
            fake_money_balance = form.data["fake_money_balance"]
        )

        # new_portfolio.owner.append(current_user)
        db.session.add(new_portfolio)
        db.session.commit()

        return new_portfolio.to_dict(transactions=True, portfolio_stocks=True), 201

    return form.errors, 400


@portfolio_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_portfolio(id):
    """Update an existing portfolio by id"""
    form = PortfolioForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    portfolio = Portfolio.query.get(id)
    current_user_id = current_user.id

    if form.validate_on_submit():
        if not portfolio:
            return {"message": "Portfolio couldn't be found"}, 404

        if current_user_id != portfolio.user_id:
            return redirect("/api/auth/forbidden")

        if form.data["name"] != portfolio.name:
            result = Portfolio.validate(form.data, current_user_id)
            if result != True:
                return result
            portfolio.name = form.data["name"]
            # portfolio.fake_money_balance += form.data["fake_money_balance"]

        # if form.data["name"] == portfolio.name:
        if float(form.data["fake_money_balance"]) < 0:
            return { "fake_money_balance": "Money can't be negative number" }, 400
        portfolio.fake_money_balance += form.data["fake_money_balance"]

        db.session.commit()

        return portfolio.to_dict(transactions=True, portfolio_stocks=True), 200

    return form.errors, 400

# methods=["DELETE"]
@portfolio_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_portfolio(id):
    """Sell all stocks in an exist portfolio by id"""

    portfolio = Portfolio.query.get(id)
    portfolio_stocks_dict = portfolio.to_dict(portfolio_stocks=True)
    portfolio_stocks_list = portfolio_stocks_dict["portfolio_stocks"]

    if not portfolio:
        return {"message": "Portfolio couldn't be found"}, 404
    if current_user.id != portfolio.user_id:
        return redirect("/api/auth/forbidden")

    for sto in portfolio_stocks_list:
        if sto["quantity"] > 0:
            """add all sell order in Transaction"""
            new_transaction = Transaction(
                portfolio_id = id,
                stock_id = sto["stock_id"],
                shares = sto["quantity"],
                type = "sell",
                is_completed = True,
                price_per_unit = sto["stock"]["newest_price"]["close_price"]
            )
            db.session.add(new_transaction)

            """update the stock quantity in Portfolio_stocks"""
            portfolio_stock = Portfolio_stock.query.get(sto["id"])
            portfolio_stock.quantity = 0

            """update the portfolio money balance"""
            portfolio.fake_money_balance += float(format((sto["quantity"] * sto["stock"]["newest_price"]["close_price"]), "0.2f"))

            db.session.commit()

    new_portfolio = Portfolio.query.get(id)

    # return { "message": f"Successfully sold all stocks in {portfolio.name} portfolio" }, 200
    return new_portfolio.to_dict(transactions=True, portfolio_stocks=True), 200
    # return portfolio_stocks_list
