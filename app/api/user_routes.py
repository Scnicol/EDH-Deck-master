from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict_full() for user in users]}


@user_routes.route('/current')
@login_required
def user():
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(current_user.id)
    return user.to_dict_full()
