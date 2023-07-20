from flask import Blueprint, jsonify, session, request
from app.models import User, db, Deck, Review
from app.forms.deck_form import CreateDeckForm
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

deck_routes = Blueprint('decks', __name__)

@deck_routes.route('/', methods=['GET'])
def get_all_decks():
    decks = Deck.query.all()
    return jsonify({'Decks': [deck.to_dict_full() for deck in decks]})

@deck_routes.route('/current', methods=['GET'])
@login_required
def get_user_deck():
    currentUserId = current_user.get_id()
    user = User.query.get(currentUserId)

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    usersDecks = Deck.query.filter(Deck.creatorId == currentUserId)
    return {'Decks': [deck.to_dict() for deck in usersDecks]}


@deck_routes.route('/', methods=['POST'])
@login_required
def create_deck():
    form = CreateDeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        newDeck = Deck(
            creatorId=current_user.id,
            name=data["name"],
            description=data["description"]
        )

        db.session.add(newDeck)
        db.session.commit()
        return newDeck.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
