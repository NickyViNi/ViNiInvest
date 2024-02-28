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
    type = db.Column(db.String, nullable=False, )
    is_completed = db.Column(db.Boolean, nullable=False)
    price_per_unit = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
