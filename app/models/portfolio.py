from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class Portfolio(db.Model):

    __tablename__ = "portfolios"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    fake_money_balance = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    """ one-to-one """
    # owner = db.relationship("User", back_populates="user_portfolio")
    """ many-to-one """
    owner = db.relationship("User", back_populates="user_portfolios")

    """ one-to-many """
    transactions = db.relationship("Transaction", back_populates="portfolio_t", cascade="all, delete-orphan")
    portfolio_stocks = db.relationship("Portfolio_stock", back_populates="portfolio_pk", cascade="all, delete-orphan")



    @classmethod
    def validate(cls, data, current_user_id, new_name=True):
        if "name" not in data:
            return { "name": "Name is required" }, 400
        if len(data["name"]) < 4:
            return { "name": "Name must be at least 4 characters" }, 400
        # if not data["fake_money_balance"].replace(".", "").isnumeric():
        #     return {"fake_money_balance": "Money must be a positive number!"}
        if float(data["fake_money_balance"]) < 0:
            return { "fake_money_balance": "Money can't be negative number" }, 400
        if new_name:
            portfolio = cls.query.filter(cls.name == data["name"]).first()
            if portfolio and portfolio.user_id == current_user_id:
                return {"name":  "This name is already taken"}, 409
        return True

    def to_dict(self, transactions=False, portfolio_stocks=False):
        result = {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "fake_money_balance": self.fake_money_balance,
            "created_at": str(self.created_at)
        }

        if transactions:
            result["transactions"] = []
            for tran in self.transactions:
                result["transactions"].append(tran.to_dict())

        # if is_completed:
        #     result["transactions"] = []
        #     for tran in self.transactions:
        #         if tran.is_completed:
        #             result["transactions"].append(tran.to_dict())

        if portfolio_stocks:
            result["portfolio_stocks"] = []
            for ps in self.portfolio_stocks:
                result["portfolio_stocks"].append(ps.to_dict())

        return result
