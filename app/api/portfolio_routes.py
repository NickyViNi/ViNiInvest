from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..models import db, Portfolio
from ..forms import PortfolioForm

portfolio_routes = Blueprint("portfolios", __name__)

@portfolio_routes.route("/")
@login_required
def portfolios():
    """Get all portfolios owned by the current signed in user"""
    user_portfolios = [portfolio.to_dict(transactions=False) for portfolio in current_user.user_portfolios]
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

    return portfolio.to_dict(transactions=True), 200


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

        return new_portfolio.to_dict(), 201

    return form.errors, 400
