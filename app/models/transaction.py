from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class Transaction(db.Model):

    __tablename__ = "transactions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("portfolios.id")), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("stocks.id")), nullable=False)
    shares = db.Column(db.Float, nullable=False)
    type = db.Column(db.String, nullable=False)
    is_completed = db.Column(db.Boolean, nullable=False)
    price_per_unit = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    """ many-to-one """
    portfolio_t = db.relationship("Portfolio", back_populates="transactions")
    stock_t = db.relationship("Stock", back_populates="transactions")

    def to_dict(self):
        result = {
            "id": self.id,
            "portfolio_id": self.portfolio_id,
            "stock_id": self.stock_id,
            "shares": self.shares,
            "type": self.type,
            "is_completed": self.is_completed,
            "price_per_unit": self.price_per_unit,
            "created_at": self.created_at,
            "portfolio": self.portfolio_t.to_dict(),
            "stock": self.stock_t.to_dict()
        }

        return result
