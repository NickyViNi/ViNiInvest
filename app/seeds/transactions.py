from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_transactions():
    transactions = [
        {
            "portfolio_id": 1,
            "stock_id": 1,
            "shares": 5.55,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 180.98
        },
        {
            "portfolio_id": 1,
            "stock_id": 3,
            "shares": 8,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 175.98
        },
        {
            "portfolio_id": 1,
            "stock_id": 2,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 168.88
        },
        {
            "portfolio_id": 1,
            "stock_id": 2,
            "shares": 10,
            "type": "sell",
            "is_completed": True,
            "price_per_unit": 178.88
        },
     ]

    [db.session.add(Transaction(**transaction)) for transaction in transactions]
    db.session.commit()


def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
