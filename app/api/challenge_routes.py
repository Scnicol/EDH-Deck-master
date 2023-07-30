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

    print(request.get_json(), "request Body")
    currentUserId = current_user.get_id()
    user = User.query.get(currentUserId)

    if user is None:
        return {'error': 'User not found'}, 404

    if form.validate_on_submit():
        challengesDate = form.data['challengeDate']

        if challengesDate < datetime.now().date():
            return {'errors': 'Cannot schedule challenge in the past'}, 400

        newChallenge = Challenge(
            name = form.data['name'],
            description = form.data['description'],
            challengeDate = form.data['challengeDate'],
            challengerId = currentUserId,
            challengedId = form.data['challengedId'],
        )

        db.session.add(newChallenge)
        db.session.commit()
        return newChallenge.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# PUT edit a challenge by id
@challenge_routes.route('/<int:challengeId>', methods=['PUT'])
@login_required
def update_challenge_byId(challengeId):
    form = CreateChallengeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    challenge = Challenge.query.get(challengeId)

    if challenge is None:
        return {"error": "Deck could not be found"}, 404

    if challenge.challengerId != current_user.id:
        return {'error': 'User is not authorized'}, 401

    if form.validate_on_submit():
        challengesDate = form.data['challengeDate']
        if challengesDate < datetime.now().date():
            return {'errors': 'Cannot schedule challenge in the past'}, 400

        challenge.name = form.data['name']
        challenge.description = form.data['description']
        challenge.challengeDate = form.data['challengeDate']

        db.session.commit()

        return challenge.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE remove a challenge by challengeId
@challenge_routes.route('/<int:challengeId>', methods=['DELETE'])
@login_required
def delete_challenge(challengeId):
    challenge = Challenge.query.get(challengeId)

    if challenge is None:
        return {"error": "Challenge could not be found"}, 404

    if challenge.challengerId != current_user.id:
        return {'error': 'User is not authorized'}, 401

    db.session.delete(challenge)
    db.session.commit()
    return {"message": "Challenge successfully deleted"}
