from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime

class Review(db.Model, UserMixin):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)
    rating = db.Column(db.Integer)
    reviewerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    deckId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('decks.id')), nullable=False)

    # Relationships _____________________

    deck = db.relationship('Deck', foreign_keys='Review.deckId', back_populates='reviews')
    reviewer = db.relationship('User', foreign_keys='Review.reviewerId', back_populates='reviews')

    # Methods _________________________

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'rating': self.rating,
            'reviewerId': self.reviewerId,
            'deckId': self.deckId
        }
