from app.models import db, Watchlist_stock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlist_stocks():
    watchlist_stocks = [
        {
            "watchlist_id": 1,
            "stock_id": 1
        },
        {
            "watchlist_id": 1,
            "stock_id": 2
        },
        {
            "watchlist_id": 1,
            "stock_id": 3
        },
        {
            "watchlist_id": 1,
            "stock_id": 4
        },
        {
            "watchlist_id": 1,
            "stock_id": 5
        },
        {
            "watchlist_id": 1,
            "stock_id": 6
        },
        {
            "watchlist_id": 1,
            "stock_id": 7
        },
        {
            "watchlist_id": 1,
            "stock_id": 8
        },

        {
            "watchlist_id": 2,
            "stock_id": 5
        },
        {
            "watchlist_id": 2,
            "stock_id": 6
        },
        {
            "watchlist_id": 2,
            "stock_id": 7
        },
        {
            "watchlist_id": 2,
            "stock_id": 8
        },
        {
            "watchlist_id": 2,
            "stock_id": 9
        },
        {
            "watchlist_id": 2,
            "stock_id": 10
        },
        {
            "watchlist_id": 2,
            "stock_id": 11
        },
        {
            "watchlist_id": 2,
            "stock_id": 12
        },

        {
            "watchlist_id": 3,
            "stock_id": 13
        },
        {
            "watchlist_id": 3,
            "stock_id": 14
        },
        {
            "watchlist_id": 3,
            "stock_id": 15
        },
        {
            "watchlist_id": 3,
            "stock_id": 16
        },
         {
            "watchlist_id": 4,
            "stock_id": 17
        },
        {
            "watchlist_id": 4,
            "stock_id": 18
        },
        {
            "watchlist_id": 4,
            "stock_id": 19
        },
        {
            "watchlist_id": 4,
            "stock_id": 20
        }
    ]

    [db.session.add(Watchlist_stock(**watchlist_stock)) for watchlist_stock in watchlist_stocks]
    db.session.commit()

def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_stocks"))

    db.session.commit()
