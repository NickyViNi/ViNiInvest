from .db import db, environment, SCHEMA
from datetime import datetime


class Stock(db.Model):

    __tablename__ = "stocks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    symbol = db.Column(db.String, nullable=False, unique=True)
    category = db.Column(db.String, nullable=False) #stock, option, ETFs
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    """ one-to-many """
    transactions = db.relationship("Transaction", back_populates="stock_t")
    prices = db.relationship("Price", back_populates="stock_p", cascade="all, delete-orphan")
    portfolio_stocks = db.relationship("Portfolio_stock", back_populates="stock_pk")
    watchlist_stocks = db.relationship("Watchlist_stock", back_populates="stock", cascade="all, delete-orphan")

    stock_analyses = db.relationship("Analysis", back_populates="stock", cascade="all, delete-orphan")


    @classmethod
    def validate(cls, data):
        if "name" not in data:
            return { "name": "Name is required" }, 400
        if "symbol" not in data:
            return { "symbol": "Symbol is required" }, 400
        return True

    def to_dict(self, prices=False, transactions=False, portfolio_stocks=False, stock_analyses=True):
        result = {
            "id": self.id,
            "name": self.name,
            "symbol": self.symbol,
            "category": self.category,
            "created_at": str(self.created_at)
        }

        for price in self.prices:
            result["newest_price"] = price.to_dict()
            break

        if prices:
            result["prices"] = []
            for price in self.prices:
                result["prices"].append(price.to_dict())

        if transactions:
            result["transactions"] = []
            for tran in self.transactions:
                result["transactions"].append(tran.to_dict())

        if portfolio_stocks:
            result["portfolio_stocks"] = []
            for ps in self.portfolio_stocks:
                result["portfolio_stocks"].append(ps.to_dict())

        if stock_analyses:
            result["stock_analyses"] = []
            for sa in self.stock_analyses:
                result["stock_analyses"].append(sa.to_dict())

        return result
