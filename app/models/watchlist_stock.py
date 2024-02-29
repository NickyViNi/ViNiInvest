from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class Watchlist_stock(db.Model):

    __tablename__ = "watchlist_stocks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("watchlists.id")), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("stocks.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    """ many-to-one """
    watchlist = db.relationship("Watchlist", back_populates="watchlist_stocks")
    stock = db.relationship("Stock", back_populates="watchlist_stocks")

    def to_dict(self):
        return {
            "id": self.id,
            "watchlist_id": self.watchlist_id,
            "stock_id": self.stock_id,
            "created_at": str(self.created_at)
        }
