from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime



def seed_transactions():
    transactions = [
        {
            "portfolio_id": 1,
            "stock_id": 1,
            "shares": 10,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 198.11,
            "created_at": datetime.fromisoformat("2023-12-14T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 1,
            "shares": 10,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 181.18,
            "created_at": datetime.fromisoformat("2024-01-05T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 1,
            "shares": 10,
            "type": "sell",
            "is_completed": True,
            "price_per_unit": 195.18,
            "created_at": datetime.fromisoformat("2024-01-23T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 1,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 184.4,
            "created_at": datetime.fromisoformat("2024-01-31T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 1,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 169.12,
            "created_at": datetime.fromisoformat("2024-03-06T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 2,
            "shares": 10,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 261.44,
            "created_at": datetime.fromisoformat("2023-12-27T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 2,
            "shares": 10,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 240.45,
            "created_at": datetime.fromisoformat("2024-01-08T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 2,
            "shares": 10,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 182.63,
            "created_at": datetime.fromisoformat("2024-01-25T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 2,
            "shares": 20,
            "type": "sell",
            "is_completed": True,
            "price_per_unit": 200.45,
            "created_at": datetime.fromisoformat("2024-02-15T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 2,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 175.34,
            "created_at": datetime.fromisoformat("2024-03-08T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 3,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 144.57,
            "created_at": datetime.fromisoformat("2024-01-04T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 3,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 155.2,
            "created_at": datetime.fromisoformat("2024-01-31T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 4,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 367.75,
            "created_at": datetime.fromisoformat("2024-01-05T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 4,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 397.58,
            "created_at": datetime.fromisoformat("2024-01-31T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 5,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 123.4,
            "created_at": datetime.fromisoformat("2023-10-27T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 5,
            "shares": 10,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 130.63,
            "created_at": datetime.fromisoformat("2023-12-24T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 5,
            "shares": 10,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 137.39,
            "created_at": datetime.fromisoformat("2024-01-05T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 5,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 154.84,
            "created_at": datetime.fromisoformat("2024-01-29T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 6,
            "shares": 100,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 57.61,
            "created_at": datetime.fromisoformat("2023-12-20T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 6,
            "shares": 100,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 58.91,
            "created_at": datetime.fromisoformat("2024-01-24T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 8,
            "shares": 10,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 475.69,
            "created_at": datetime.fromisoformat("2024-01-03T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 8,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 571.07,
            "created_at": datetime.fromisoformat("2024-01-18T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 8,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 674.72,
            "created_at": datetime.fromisoformat("2024-02-21T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 9,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 344.47,
            "created_at": datetime.fromisoformat("2024-01-03T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 10,
            "shares": 20,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 630.78,
            "created_at": datetime.fromisoformat("2023-12-14T13:14:25")
        },
        {
            "portfolio_id": 1,
            "stock_id": 11,
            "shares": 10,
            "type": "buy",
            "is_completed": True,
            "price_per_unit": 903.64,
            "created_at": datetime.fromisoformat("2023-12-06T13:14:25")
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
