from flask import Blueprint, jsonify, session, request
from app.models import User, db, Deck, Review, Card, Challenge
from app.forms.challenge_form import CreateChallengeForm
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

challenge_routes = Blueprint('challenges', __name__)

# GET all the challenges
@challenge_routes.route('', methods=['GET'])
def get_all_challenges():
    challenges = Challenge.query.all()
    return {'challenges': [challenge.to_dict() for challenge in challenges]}

# GET all the startedChallenges and receivedChallenges for current user
@challenge_routes.route('/current', methods=['GET'])
@login_required
def get_user_challenges():
    currentUserId = current_user.get_id()
    user = User.query.get(currentUserId)

    if user is None:
        return {'error': 'User not found'}, 404

    return {'startedChallenges': [challenge.to_dict() for challenge in user.challengerChallenges],
            'receivedChallenges': [challenge.to_dict() for challenge in user.challengedChallenges]}

#  GET a challenge by challengeId
@challenge_routes.route('/<int:challengeId>', methods=['GET'])
def get_challenge_byId(challengeId):

    challenge = Challenge.query.get(challengeId)

    if challenge is None:
        return {'error': 'challenge not found'}, 404

    return challenge.to_dict()

# POST create a challenge
@challenge_routes.route('', methods=['POST'])
@login_required
def create_challenge():
    form = CreateChallengeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    currentUserId = current_user.get_id()
    print(currentUserId, '_________CurrentUserId__________')
    user = User.query.get(currentUserId)

    if user is None:
        return {'error': 'User not found'}, 404

    if form.validate_on_submit():
        data = form.data

        newChallenge = Challenge(
            name = data['name'],
            description = data['description'],
            challengeDate = data['challengeDate'],
            challengerId = currentUserId,
            challengedId = data['challengedId'],
        )

        db.session.add(newChallenge)
        db.session.commit()
        return newChallenge.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

