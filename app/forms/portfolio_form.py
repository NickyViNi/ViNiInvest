from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, ValidationError

def name_check_len(form, field):
    if len(field.data) < 4:
        raise ValidationError("Portfolio Name must be at least 4 characters")

def money_check_amount(form, field):
    if field.data < 0:
        raise ValidationError("Money shouldn't be less than 0")

class PortfolioForm(FlaskForm):
    name = StringField("Portfolio Name", validators=[DataRequired(), name_check_len])
    fake_money_balance = FloatField("Money Amount", validators=[DataRequired(), money_check_amount])
