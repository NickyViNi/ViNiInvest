from flask import Blueprint, request, redirect
from flask_login import login_required
from ..models import db, Stock, Transaction, Portfolio, Portfolio_stock
from ..forms import TransactionForm

transaction_routes = Blueprint("transactions", __name__)

@transaction_routes.route("/<int:id>")
@login_required
def confirm_transaction(id):
    """Confirm a transaction by id"""
    transaction = Transaction.query.get(id)
    stock = Stock.query.get(transaction.stock_id)
    portfolio = Portfolio.query.get(transaction.portfolio_id)
    portfolio_stock = Portfolio_stock.query.filter(Portfolio_stock.portfolio_id == transaction.portfolio_id).filter(Portfolio_stock.stock_id == transaction.stock_id).one_or_none()
    if not transaction:
        return {"message": "Transaction couldn't be found"}, 404
    if transaction.is_completed:
        return {"message": "Transaction was already completed"}, 400

    transaction.is_completed = True

    """update portfolio money balance when "sell"""
    if transaction.type.lower() == "buy":
        """update the portfolio_stocks table"""
        if portfolio_stock:
            portfolio_stock.quantity += transaction.shares
        else:
            new_portfolio_stock = Portfolio_stock(
                portfolio_id = transaction.portfolio_id,
                stock_id = transaction.stock_id,
                quantity = transaction.shares
            )
            db.session.add(new_portfolio_stock)

    if transaction.type.lower() == "sell":
        portfolio.fake_money_balance += float(format(transaction.shares * transaction.price_per_unit), "0.2f")
        """update the portfolio_stocks table"""
        portfolio_stock.quantity -= transaction.shares

    db.session.commit()
    return stock.to_dict(prices=True, transactions=True)


@transaction_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_transaction(id):
    """Update the shares of a stock in an pending transaction by id"""
    form = TransactionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    transaction = Transaction.query.get(id)
    portfolio = Portfolio.query.get(transaction.portfolio_id)
    old_order_shares = transaction.shares
    portfolio_stock = Portfolio_stock.query.filter(Portfolio_stock.portfolio_id == transaction.portfolio_id).filter(Portfolio_stock.stock_id == transaction.stock_id).one_or_none()
    stock = Stock.query.get(transaction.stock_id)

    if form.validate_on_submit():
        if not transaction:
            return {"message": "Transaction couldn't be found"}, 404
        if transaction.is_completed:
            return {"message": "You can't update a completed transaction"}, 400
        if float(form.data["shares"]) < 0:
            return { "shares": "Shares can't be negative number" }, 400

        if transaction.type == "buy":
            if old_order_shares > form.data["shares"]:
                portfolio.fake_money_balance += float((old_order_shares-form.data["shares"]) * transaction.price_per_unit)
            if old_order_shares < form.data["shares"]:
                more_shares = form.data["shares"] - old_order_shares
                if portfolio.fake_money_balance < more_shares * transaction.price_per_unit:
                    return {"message": "Sorry, there is no sufficient balance"}
                portfolio.fake_money_balance -= float(more_shares * transaction.price_per_unit)
        if transaction.type == "sell":
            if not portfolio_stock:
                return {"message": "You don't have any share of this stock to sell"}
            if portfolio_stock and portfolio_stock.quantity < form.data["shares"]:
                return {"message": "You don't have enough shares of this stock to sell"}

        transaction.shares = form.data["shares"]
        db.session.commit()
        return stock.to_dict(prices=True, transactions=True), 200
    return form.errors, 400

@transaction_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_transaction(id):
    """Delete a pending transaction by id"""
    transaction = Transaction.query.get(id)
    stock = Stock.query.get(transaction.stock_id)
    portfolio = Portfolio.query.get(transaction.portfolio_id)

    if not transaction:
        return {"message": "Transaction couldn't be found"}, 404

    if transaction.type == "buy":
        portfolio.fake_money_balance += float(transaction.shares * transaction.price_per_unit)

    db.session.delete(transaction)
    db.session.commit()

    return stock.to_dict(prices=True, transactions=True)
