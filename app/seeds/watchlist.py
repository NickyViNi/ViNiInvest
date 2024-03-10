from app.models import db, Watchlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlists():
    watchlists = [
        {
            "name": "Spring Watchlist",
            "user_id": 1
        },
        {
            "name": "Summer Watchlist",
            "user_id": 1
        },
        {
            "name": "Autumn Watchlist",
            "user_id": 1
        },
        {
            "name": "Winter Watchlist",
            "user_id": 1
        }
    ]

    [db.session.add(Watchlist(**watchlist)) for watchlist in watchlists]
    db.session.commit()

def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
