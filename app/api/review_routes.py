from flask import Blueprint, jsonify, session, request
from app.models import User, db, Deck, Review, Card
from app.forms.review_form import CreateReviewForm
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

review_routes = Blueprint('reviews', __name__)

# GET all reviews
@review_routes.route('', methods=['GET'])
def get_all_reviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}

# GET all reviews for the current user
@review_routes.route('/current', methods=['GET'])
@login_required
def get_user_reviews():
    currentUserId = current_user.get_id()
    user = User.query.get(currentUserId)

    if user is None:
        return {'error': 'User not found'}, 404

    return {'reviews': [review.to_dict() for review in user.reviews]}

# POST create a review for a deck
@review_routes.route('', methods=['POST'])
@login_required
def create_review():
    reviewForm = CreateReviewForm()
    reviewForm['csrf_token'].data = request.cookies['csrf_token']

    print(request.get_json(), "request Body")
    if reviewForm.validate_on_submit():

        newReview = Review(
            deckId = reviewForm.data['deckId'],
            description = reviewForm.data['description'],
            rating = reviewForm.data['rating'],
            reviewerId = current_user.id
        )

        db.session.add(newReview)
        db.session.commit()
        return newReview.to_dict()
    return {'errors': validation_errors_to_error_messages(reviewForm.errors)}, 401

# PUT edit a review by reviewId
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def edit_review_byId(reviewId):
    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    review = Review.query.get(reviewId)

    if review is None:
        return {"error": "Deck could not be found"}, 404

    if review.reviewerId != current_user.id:
        return {'error': 'User is not authorized'}, 401

    if form.validate_on_submit():

        review.description = form.data['description']
        review.rating = form.data['rating']

        db.session.commit()

        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE remove a review by reviewId
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review_byId(reviewId):
    review = Review.query.get(reviewId)

    if review is None:
        return {"error": "Deck could not be found"}, 404

    if review.reviewerId != current_user.id:
        return {'error': 'User is not authorized'}, 401

    db.session.delete(review)
    db.session.commit()
    return {'message': 'Review successfully deleted'}
