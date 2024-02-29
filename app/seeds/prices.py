from app.models import db, Price, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_prices():
    prices = [
        {
            "stock_id": 1,
            "max_price": 180,
            "price": 180,
            "min_price": 180,
            "date": "2023-12-23"
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
