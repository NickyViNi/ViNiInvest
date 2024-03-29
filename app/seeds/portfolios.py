from app.models import db, Portfolio, environment, SCHEMA
from sqlalchemy.sql import text



def seed_portfolios():
    portfolios = [
        {
            "name": "Value Investment",
            "user_id": 1,
            "fake_money_balance": 5201314.99,
        },
        {
            "name": "Cash is King",
            "user_id": 1,
            "fake_money_balance": 8201314.99,
        },
        {
            "name": "Venture Capital",
            "user_id": 1,
            "fake_money_balance": 9999.99,
        },
        {
            "name": "Tech Invest",
            "user_id": 1,
            "fake_money_balance": 8888.88,
        },
        {
            "name": "Vince Portfolio",
            "user_id": 2,
            "fake_money_balance": 1314520.99,
        },
        {
            "name": "Hao Portfolio",
            "user_id": 3,
            "fake_money_balance": 18888.88,
        },
        {
            "name": "Nick Portfolio",
            "user_id": 4,
            "fake_money_balance": 16666.66,
        }
     ]

    [db.session.add(Portfolio(**portfolio)) for portfolio in portfolios]
    db.session.commit()


def undo_portfolio():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolios"))

    db.session.commit()
