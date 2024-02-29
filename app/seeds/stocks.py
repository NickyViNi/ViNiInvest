from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_stocks():
    stocks = [
        {
            "name": "Apple",
            "symbol": "AAPL",
            "category": "stock"
        },
        {
            "name": "Tesla",
            "symbol": "TSLA",
            "category": "stock"
        },
        {
            "name": "Amazon",
            "symbol": "AMZN",
            "category": "stock"
        },
        {
            "name": "Microsoft",
            "symbol": "MSFT",
            "category": "stock"
        },
        {
            "name": "Alphabet Class C",
            "symbol": "GOOG",
            "category": "stock"
        },
        {
            "name": "Coca-Cola",
            "symbol": "KO",
            "category": "stock"
        },
        {
            "name": "Berkshire Hathaway",
            "symbol": "BRK.A",
            "category": "stock"
        },
        {
            "name": "NVIDIA",
            "symbol": "NVDA",
            "category": "stock"
        },
        {
            "name": "Meta Platforms",
            "symbol": "META",
            "category": "stocks"
        },
        {
            "name": "Costco",
            "symbol": "COST",
            "category": "stocks"
        },
        {
            "name": "Walmart",
            "symbol": "WMT",
            "category": "stocks"
        },
        {
            "name": "Technology Select Sector SPDR",
            "symbol": "XLK",
            "category": "ETFs"
        },
        {
            "name": "First Trust Dow Jones Internet Index Fund",
            "symbol": "FDN",
            "category": "ETFs"
        }
     ]

    [db.session.add(Stock(**stock)) for stock in stocks]
    db.session.commit()


def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))

    db.session.commit()
