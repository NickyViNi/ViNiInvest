from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class Portfolio(db.Model):

    __tablename__ = "portfolios"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False, unique=True)
    fake_money_balance = db.Column(db.Float, default=1000)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    """ one-to-one """
    owner = db.relationship("User", back_populates="user_portfolio", cascade="all, delete-orphan")


    @classmethod
    def validate(cls, data):
        if "name" not in data:
            return { "name": "Name is required" }, 400
        if len(data["name"]) < 4:
            return { "name": "Name must be at least 4 characters" }, 400
        if "fake_money_balance" < 0:
            return { "money": "Money can't be negative number" }, 400
        return True

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "fake_money_balance": self.fake_money_balance,
            "created_at": str(self.created_at)
        }
