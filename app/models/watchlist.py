from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Watchlist(db.Model):

    __tablename__ = "watchlists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    """ one-to-many """
    watchlist_stocks = db.relationship("Watchlist_stock", back_populates="watchlist", cascade="all, delete-orphan")

    """ many-to-one """
    user = db.relationship("User", back_populates="watchlists")

    def to_dict(self, watchlist_stocks=False):
        result = {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id
        }
        if watchlist_stocks:
            result["watchlist_stocks"] = []
            for ws in self.watchlist_stocks:
                result["watchlist_stocks"].append(ws.to_dict())

        return result
