from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Analysis(db.Model):
    __tablename__ = "analyses"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("stocks.id")), nullable=False)
    content = db.Column(db.String, nullable=False)
    recommendation = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    """many-to-one"""
    user = db.relationship("User", back_populates="user_analyses")
    stock = db.relationship("Stock", back_populates="stock_analyses")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "stock_id": self.stock_id,
            "content": self.content,
            "recommendation": self.recommendation,
            "user": self.user.to_dict()
        }
