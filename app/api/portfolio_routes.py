from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from ..models import Portfolio
from ..forms import PortfolioForm

portfolio_routes = Blueprint("portfolios", __name__)

@portfolio_routes.route("/")
@login_required
def portfolios():
    """Get all portfolios owned by the current signed in user"""
    user_portfolios = [portfolio.to_dict(transactions=True) for portfolio in current_user.user_portfolios]
    return {"Portfolios": user_portfolios}, 200
