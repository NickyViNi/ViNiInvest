from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text



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
            "category": "stock"
        },
        {
            "name": "Costco",
            "symbol": "COST",
            "category": "stock"
        },
         {
            "name": "Broadcom",
            "symbol": "AVGO",
            "category": "stock"
        },
        {
            "name": "Netflix",
            "symbol": "NFLX",
            "category": "stock"
        },
        {
            "name": "Salesforce",
            "symbol": "CRM",
            "category": "stock"
        },
        {
            "name": "Arista",
            "symbol": "ANET",
            "category": "stock"
        },
        {
            "name": "Airbnb",
            "symbol": "ABNB",
            "category": "stock"
        },
        {
            "name": "PayPal",
            "symbol": "PYPL",
            "category": "stock"
        },
        {
            "name": "Adobe",
            "symbol": "ADBE",
            "category": "stock"
        },
        {
            "name": "AMD",
            "symbol": "AMD",
            "category": "stock"
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
