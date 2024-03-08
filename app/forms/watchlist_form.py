from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def name_check_len(form, field):
    if len(field.data) < 4:
        raise ValidationError("Watchlist name must be at least 4 characters")

class WatchlistForm(FlaskForm):
    name = StringField("Watchlist Name", validators=[DataRequired(), name_check_len])
