from app.models import db, Portfolio_stock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_portfolio_stocks():
    portfolio_stocks = [
        {
            "portfolio_id": 1,
            "stock_id": 1,
            "quantity": 50,
        },
        {
            "portfolio_id": 1,
            "stock_id": 2,
            "quantity": 30,
        },
        {
            "portfolio_id": 1,
            "stock_id": 3,
            "quantity": 40,
        },
        {
            "portfolio_id": 1,
            "stock_id": 4,
            "quantity": 40,
        },
        {
            "portfolio_id": 1,
            "stock_id": 5,
            "quantity": 60,
        },
        {
            "portfolio_id": 1,
            "stock_id": 6,
            "quantity": 200,
        },
        {
            "portfolio_id": 1,
            "stock_id": 8,
            "quantity": 50,
        },
        {
            "portfolio_id": 1,
            "stock_id": 9,
            "quantity": 20,
        },
        {
            "portfolio_id": 1,
            "stock_id": 10,
            "quantity": 20,
        },
        {
            "portfolio_id": 1,
            "stock_id": 11,
            "quantity": 10,
        },

        {
            "portfolio_id": 2,
            "stock_id": 7,
            "quantity": 0.1,
        },
        {
            "portfolio_id": 2,
            "stock_id": 12,
            "quantity": 20,
        },
        {
            "portfolio_id": 2,
            "stock_id": 13,
            "quantity": 20,
        },
        {
            "portfolio_id": 2,
            "stock_id": 14,
            "quantity": 10,
        },

        {
            "portfolio_id": 3,
            "stock_id": 15,
            "quantity": 90,
        },
        {
            "portfolio_id": 3,
            "stock_id": 16,
            "quantity": 50,
        },
        {
            "portfolio_id": 3,
            "stock_id": 17,
            "quantity": 20,
        },
        {
            "portfolio_id": 3,
            "stock_id": 18,
            "quantity": 10,
        },

        {
            "portfolio_id": 4,
            "stock_id": 19,
            "quantity": 200,
        },
        {
            "portfolio_id": 4,
            "stock_id": 20,
            "quantity": 200,
        },
    ]

    [db.session.add(Portfolio_stock(**portfolio_stock)) for portfolio_stock in portfolio_stocks]
    db.session.commit()

def undo_portfolio_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolio_stocks"))

    db.session.commit()
