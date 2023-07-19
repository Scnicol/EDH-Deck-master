from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime
from wishlist import wishlist_association_table

class Deck(db.Model, UserMixin):
    __tablename__ = 'decks'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships _____________________

    creator = db.relationship('User', foreign_keys='Deck.creatorId', back_populates='decks')
    
    cards = db.relationship('Card', foreign_keys='Card.deckId', back_populates='deck', cascade='all, delete-orphan')
    reviews = db.relationship('Review', foreign_keys='Review.reviewerId', back_populates='deck', cascade='all, delete-orphan')
    wishlist_users = db.relationship('User', secondary=wishlist_association_table, back_populates='wishlist_decks')

    # Methods _________________________

    def to_dict(self):
        return {
            'id': self.id,
            'creatorId': self.creatorId,
            'name': self.name,
            'description': self.description,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        }
