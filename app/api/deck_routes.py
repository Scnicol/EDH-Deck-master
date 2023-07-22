from flask import Blueprint, jsonify, session, request
from app.models import User, db, Deck, Review, Card
from app.forms.deck_form import CreateDeckForm
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

deck_routes = Blueprint('decks', __name__)

@deck_routes.route('/', methods=['GET'])
def get_all_decks():
    decks = Deck.query.all()
    return {'decks': [deck.to_dict_full() for deck in decks]}

@deck_routes.route('/current', methods=['GET'])
@login_required
def get_user_decks():
    currentUserId = current_user.get_id()
    user = User.query.get(currentUserId)

    if user is None:
        return {'error': 'User not found'}, 404

    return {'Decks': [deck.to_dict() for deck in user.decks]}

# GET one deck specified by id


@deck_routes.route('/', methods=['POST'])
@login_required
def create_deck():
    form = CreateDeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        deckData = request.get_json()

        newDeck = Deck(
            creatorId = current_user.id,
            name = data["name"],
            description = data["description"]
        )

        for cardData in deckData["cards"]:
            card = Card(
                count = cardData["count"],
                name = cardData["name"],
                imageUrl = cardData["imageUrl"]
            )

            newDeck.cards.append(card)

        db.session.add(newDeck)
        db.session.commit()
        return newDeck.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@deck_routes.route('/<int:deckId>', methods=['PUT'])
@login_required
def update_deck(deckId):
    deck = Deck.query.get(deckId)

    if deck is None:
        return {"error": "Deck could not be found"}, 404

    if deck.creatorId != current_user.id:
        return {'error': 'User is not authorized'}, 401

    deck.name = request.json['name']
    deck.description = request.json['description']

    db.session.commit()

    return {'deck': deck.to_dict()}

@deck_routes.route('/<int:deckId>', methods=['DELETE'])
@login_required
def delete_deck(deckId):
    deck = Deck.query.get(deckId)

    if deck is None:
        return {"error": "Deck could not be found"}, 404

    if deck.creatorId != current_user.id:
        return {'error': 'User is not authorized'}, 401

    db.session.delete(deck)
    db.session.commit()
    return {"message": "Deck successfully deleted"}
