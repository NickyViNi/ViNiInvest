from .db import db, environment, SCHEMA, add_prefix_for_prod



class Price(db.Model):

    __tablename__ = "prices"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("stocks.id")), nullable=False)
    max_price = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    min_price = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime)

    """ many-to-one """
    stock_p = db.relationship("Stock", back_populates="prices")
