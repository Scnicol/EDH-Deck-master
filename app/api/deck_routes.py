from flask import Blueprint, jsonify, session, request
from app.models import User, db, Deck, Review, Card
from app.forms.deck_form import CreateDeckForm
from app.forms.card_form import CreateCardForm
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

deck_routes = Blueprint('decks', __name__)

# GET all decks
@deck_routes.route('', methods=['GET'])
def get_all_decks():
    decks = Deck.query.all()
    return {'decks': [deck.to_dict_full() for deck in decks]}

# GET all decks created for the current user
@deck_routes.route('/current', methods=['GET'])
@login_required
def get_user_decks():
    currentUserId = current_user.get_id()
    user = User.query.get(currentUserId)

    if user is None:
        return {'error': 'User not found'}, 404

    return {'decks': [deck.to_dict_full() for deck in user.decks]}

# GET one deck specified by id
@deck_routes.route('/<int:deckId>', methods=['GET'])
def get_deck_byId(deckId):

    deck = Deck.query.get(deckId)

    if deck is None:
        return {'error': 'deck not found'}, 404

    return deck.to_dict_full()

# POST create a deck with a list of cards
# Ask how we can pass the cardData object into our cardForm
@deck_routes.route('', methods=['POST'])
@login_required
def create_deck():
    deckForm = CreateDeckForm()
    deckForm['csrf_token'].data = request.cookies['csrf_token']

    if deckForm.validate_on_submit():
        deckData = request.get_json()

        newDeck = Deck(
            creatorId = current_user.id,
            name = deckForm.data["name"],
            description = deckForm.data["description"]
        )

        for cardData in deckData["cards"]:
            # cardForm = CreateCardForm(obj=cardData)
            # cardForm['csrf_token'].data = request.cookies['csrf_token']
            # if cardForm.validate_on_submit():

                card = Card(
                    count = cardData["count"],
                    name = cardData["name"],
                    mtgId = cardData["mtgId"],
                    imageUrl = cardData["imageUrl"]
                )

                newDeck.cards.append(card)

        db.session.add(newDeck)
        db.session.commit()
        return newDeck.to_dict_full()
    return {'deck errors': validation_errors_to_error_messages(deckForm.errors)}, 401

# PUT edit a deck by deckId
@deck_routes.route('/<int:deckId>', methods=['PUT'])
@login_required
def update_deck(deckId):
    deckForm = CreateDeckForm()
    deckForm['csrf_token'].data = request.cookies['csrf_token']

    # cardForm = CreateCardForm()
    # cardForm['csrf_token'].data = request.cookies['csrf_token']

    deck = Deck.query.get(deckId)

    if deck is None:
        return {"error": "Deck could not be found"}, 404

    if deck.creatorId != current_user.id:
        return {'error': 'User is not authorized'}, 401

    if deckForm.validate_on_submit():
        data = deckForm.data
        deckData = request.get_json()

        deck.name = deckForm.data['name']
        deck.description = deckForm.data['description']

        # if cardForm.validate_on_submit():

        # for card in deck.cards:
        #     deck.cards.remove(card)

        cardsArr = []
        for cardData in deckData["cards"]:
            card = Card(
                deckId = deckId,
                count = cardData["count"],
                name = cardData["name"],
                mtgId = cardData["mtgId"],
                imageUrl = cardData["imageUrl"]
            )

            cardsArr.append(card)
        deck.cards = cardsArr
        db.session.commit()

        return deck.to_dict_full()
    return {'deck errors': validation_errors_to_error_messages(deckForm.errors)}, 401

# DELETE remove a deck by deckId
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
