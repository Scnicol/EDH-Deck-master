from flask import Blueprint, jsonify, session, request
from app.models import User, db, Deck, Review, Card, Challenge
from app.forms.deck_form import CreateDeckForm
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

challenge_routes = Blueprint('challenges', __name__)

@challenge_routes.route('/', methods=['GET'])
def get_all_challenges():
    challenges = Challenge.query.all()
    return {'challenges': [challenge.to_dict() for challenge in challenges]}


@challenge_routes.route('/current', methods=['GET'])
@login_required
def get_user_challenges():
    currentUserId = current_user.get_id()
    user = User.query.get(currentUserId)

    if user is None:
        return {'error': 'User not found'}, 404

    return {'startedChallenges': [challenge.to_dict() for challenge in user.challengerChallenges],
            'recievedChallenges': [challenge.to_dict() for challenge in user.challengedChallenges]}
