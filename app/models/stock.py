from .db import db, environment, SCHEMA
from datetime import datetime


class Stock(db.Model):

    __tablename__ = "stocks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    symbol = db.Column(db.String, nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    @classmethod
    def validate(cls, data):
        if "name" not in data:
            return { "name": "Name is required" }, 400
        if "symbol" not in data:
            return { "symbol": "Symbol is required" }, 400
        return True

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "symbol": self.symbol,
            "created_at": str(self.created_at)
        }
