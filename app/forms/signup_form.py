import re
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from urllib.request import urlopen
from app.models import User
from ..api.aws_helpers import ALLOWED_EXTENSIONS


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField("First name", validators=[DataRequired()])
    last_name = StringField("Last name", validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired(), username_exists])
    email = StringField('Email', validators=[DataRequired(), user_exists])
    password = StringField('Password', validators=[DataRequired()])
    profile_image_url = FileField("Profile Image Url", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
