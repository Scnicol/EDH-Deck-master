from flask import Blueprint, jsonify, session, request
from app.models import User, db, Deck
from app.forms import CreateDeckForm
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

deck_routes = Blueprint('decks', __name__)

@deck_routes.route('/', methods=['GET'])
def get_all_decks():
    decks = Deck.query.all()
    return jsonify({'Decks': [deck.to_dict() for deck in decks]})


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
