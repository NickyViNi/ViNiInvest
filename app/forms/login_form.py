from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email_username = field.data
    user = User.query.filter((User.email == email_username) | (User.username == email_username)).first()
    if not user:
        raise ValidationError('Email or Username provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email_username = form.data['email_username']
    user = User.query.filter((User.email == email_username) | (User.username == email_username)).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email_username = StringField('Email or Username', validators=[DataRequired(), user_exists])
    password = StringField('Password', validators=[DataRequired(), password_matches])
