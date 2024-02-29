from app.models import db, Price, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_prices():
    prices = [
        {
            "stock_id": 1,
            "high_price": 180,
            "low_price": 180,
            "open_price": 180,
            "close_price": 180,
            "date": date.fromisoformat("2024-02-28")
        },
     ]

    [db.session.add(Price(**price)) for price in prices]
    db.session.commit()


def undo_prices():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.prices RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM prices"))

    db.session.commit()
