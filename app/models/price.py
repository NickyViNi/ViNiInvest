from .db import db, environment, SCHEMA, add_prefix_for_prod



class Price(db.Model):

    __tablename__ = "prices"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("stocks.id")), nullable=False)
    high_price = db.Column(db.Float, nullable=False)
    low_price = db.Column(db.Float, nullable=False)
    open_price = db.Column(db.Float, nullable=False)
    close_price = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date)

    """ many-to-one """
    stock_p = db.relationship("Stock", back_populates="prices")

    def to_dict(self):
        return {
            "id": self.id,
            "stock_id": self.stock_id,
            "max_price": self.max_price,
            "price": self.price,
            "min_price": self.min_price,
            "date": self.date
        }
