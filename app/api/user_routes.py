from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.wishlist_form import UpdateWishlistForm
from app.models import User, Deck, db
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict_full() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict_full()

@user_routes.route('/wishlist', methods=['POST'])
@login_required
def addDeckToWishlist():
    wishlistForm = UpdateWishlistForm()
    wishlistForm['csrf_token'].data = request.cookies['csrf_token']

    if wishlistForm.validate_on_submit():
        user = current_user
        deckId = wishlistForm.data['deckId']

        deck = Deck.query.get(deckId)

        if deck is None:
            return {'error': 'Deck could not be found'}, 404

        if deck.creatorId == user.id:
            return {'error': 'Users cannot add their own decks to their wishlist'}, 400


        user.wishlistDecks.append(deck)
        db.session.commit()
        return user.to_dict_full()
    return {'form errors': validation_errors_to_error_messages(wishlistForm.errors)}, 401

@user_routes.route('/wishlist/<int:deckId>', methods=['DELETE'])
@login_required
def deleteDeckFromWishlist(deckId):
    wishlistForm = UpdateWishlistForm()
    wishlistForm['csrf_token'].data = request.cookies['csrf_token']

    if wishlistForm.validate_on_submit():
        user = current_user
        # deckId = wishlistForm.data['deckId']

        deck = Deck.query.get(deckId)

        if deck is None:
            return {'error': 'Deck could not be found'}, 404


        user.wishlistDecks.remove(deck)
        db.session.commit()
        return user.to_dict()
    return {'form errors': validation_errors_to_error_messages(wishlistForm.errors)}, 401
