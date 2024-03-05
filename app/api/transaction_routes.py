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
    portfolio = Portfolio.query.get(transaction.portfolio_id)
    portfolio_stock = Portfolio_stock.query.filter(Portfolio_stock.portfolio_id == transaction.portfolio_id & Portfolio_stock.stock_id == transaction.stock_id).one_or_none()
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
    return {"message": f"#{id} transaction is completed!"}


@transaction_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_transaction(id):
    """Update the shares of a stock in an pending transaction by id"""
    form = TransactionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    transaction = Transaction.query.get(id)
    old_order_shares = transaction.shares

    if form.validate_on_submit():
        if not transaction:
            return {"message": "Transaction couldn't be found"}, 404
        if transaction["is_completed"]:
            return {"message": "You can't update a completed transaction"}, 400
        if float(form.data["shares"]) < 0:
            return { "shares": "Shares can't be negative number" }, 400
        transaction["shares"] = form.data["shares"]
        db.session.commit()
        return transaction.to_dict(), 200
    return form.errors, 400

@transaction_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_transaction(id):
    """Delete a pending transaction by id"""
    transaction = Transaction.query.get(id)
    portfolio = Portfolio.query.get(transaction["portfolio_id"])

    if not transaction:
        return {"message": "Transaction couldn't be found"}, 404

    portfolio.fake_money_balance += float(format(transaction.shares * transaction.price_per_unit), "0.2f")

    db.session.delete(transaction)
    db.session.commit()

    return { "message": f"Successfully deleted #{id} transaction" }
