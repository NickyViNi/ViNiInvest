from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime



def seed_transactions():
    transactions = [
        {
            "portfolio_id": 1,
            "stock_id": 1,
            "shares": 5.55,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 180.98,
            "created_at": datetime.fromisoformat("2024-02-05T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 3,
            "shares": 8,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 110.98,
            "created_at": datetime.fromisoformat("2024-02-06T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 2,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 168.88,
            "created_at": datetime.fromisoformat("2024-02-07T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 2,
            "shares": 10,
            "type": "sell",
            "is_completed": True,
            "price_per_unit": 200.88,
            "created_at": datetime.fromisoformat("2024-02-08T13:14:25")
        },
         {
            "portfolio_id": 2,
            "stock_id": 4,
            "shares": 6.55,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 180.98,
            "created_at": datetime.fromisoformat("2024-02-12T13:14:25")
        },
        {
            "portfolio_id": 2,
            "stock_id": 5,
            "shares": 8,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 130.98,
            "created_at": datetime.fromisoformat("2024-02-13T13:14:25")
        },
        {
            "portfolio_id": 2,
            "stock_id": 4,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 368.88,
            "created_at": datetime.fromisoformat("2024-02-14T13:14:25")
        },
        {
            "portfolio_id": 2,
            "stock_id": 4,
            "shares": 10,
            "type": "sell",
            "is_completed": True,
            "price_per_unit": 413.88,
            "created_at": datetime.fromisoformat("2024-02-29T13:14:25")
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
