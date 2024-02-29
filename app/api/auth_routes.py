from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from .aws_helpers import (upload_file_to_s3, get_unique_filename)

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict(), 200
    return {'message': 'Unauthorized'}, 401

@auth_routes.route('/<int:id>')
@login_required
def get_current_user(id):
    """Get the user by id"""
    user = User.query.get(id)

    if not user:
        return { "message": "User couldn't be found" }, 404

    return user.to_dict(), 200


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter((User.email == form.data['email_username']) | (User.username == form.data['email_username'])).first()

        login_user(user)

        return user.to_dict()

    return form.errors, 401


@auth_routes.route('/logout')
@login_required
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}, 200


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = form.data["profile_image_url"]
        url = None
        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return upload, 500
            url = upload["url"]

        user = User(
            first_name=form.data["first_name"],
            last_name=form.data["last_name"],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            profile_image_url=url
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()

    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401

@auth_routes.route('/forbidden')
def forbidden():
    """User is forbbiden to perform this action."""
    return { "message": "Forbidden" }, 403
