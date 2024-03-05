from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, BooleanField, SelectField
from wtforms.validators import DataRequired, ValidationError


def share_check(form, field):
    if field.data <= 0:
        raise ValidationError("Share must be grater than 0")

def type_check(form, field):
    if field.data.lower() not in ["sell", "buy"]:
        raise ValidationError("Transaction type must be sell or buy")

class TransactionForm(FlaskForm):
    shares = FloatField("Shares", validators=[DataRequired(), share_check])
    type = SelectField("Type", choices=["sell", "buy"], coerce=str, validate_choice=True, validators=[DataRequired(), type_check])
    # is_completed = BooleanField("Is Completed", validators=[DataRequired()])
    # price_per_unit = FloatField("Price per Unit", validators=[DataRequired()])
