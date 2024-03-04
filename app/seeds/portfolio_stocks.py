from app.models import db, Portfolio_stock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_portfolio_stocks():
    portfolio_stocks = [
        {
            "portfolio_id": 1,
            "stock_id": 2,
            "quantity": 10,
        },
        {
            "portfolio_id": 1,
            "stock_id": 3,
            "quantity": 8,
        },
        {
            "portfolio_id": 1,
            "stock_id": 1,
            "quantity": 5.55,
        },
        {
            "portfolio_id": 2,
            "stock_id": 4,
            "quantity": 16.55,
        },
        {
            "portfolio_id": 2,
            "stock_id": 5,
            "quantity": 8,
        }
    ]

    [db.session.add(Portfolio_stock(**portfolio_stock)) for portfolio_stock in portfolio_stocks]
    db.session.commit()

def undo_portfolio_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolio_stocks"))

    db.session.commit()
