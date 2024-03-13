from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def check_recom(form, field):
    if field.data.lower() not in ["buy", "sell", "hold"]:
        raise ValidationError("Recommendation can only be 'sell', 'buy', or 'hold'")

def check_content_len(form, field):
    if len(field.data) < 50:
        raise ValidationError("Analysis content length at least 50 characters")

class AnalysisForm(FlaskForm):
    content = StringField("Content", validators=[DataRequired()])
    recommendation = StringField("Recommendation", validators=[DataRequired(), check_recom])
