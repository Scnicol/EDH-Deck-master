from flask import Blueprint, jsonify, session, request
from app.models import User, db, Deck, Review, Card
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

review_routes = Blueprint('reviews', __name__)

# Get all reviews
@review_routes.route('', methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}

# Get all reviews for the current user
@review_routes.route('/current', methods=['GET'])
@login_required
def get_user_reviews():
    currentUserId = current_user.get_id()
    user = User.query.get(currentUserId)

    if user is None:
        return {'error': 'User not found'}, 404

    return {'Decks': [deck.to_dict() for deck in user.decks]}
