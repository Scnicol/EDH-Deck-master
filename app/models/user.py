from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .wishlist import wishlistAssociationTable


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships _____________________

    decks = db.relationship('Deck', foreign_keys='Deck.creatorId', back_populates='creator', cascade='all, delete-orphan')
    reviews = db.relationship('Review', foreign_keys='Review.reviewerId', back_populates='reviewer', cascade='all, delete-orphan')


    challengerChallenges = db.relationship('Challenge', foreign_keys="Challenge.challengerId", back_populates="challenger", cascade='all, delete-orphan')
    challengedChallenges = db.relationship('Challenge', foreign_keys="Challenge.challengedId", back_populates="challenged", cascade='all, delete-orphan')

    wishlistDecks = db.relationship('Deck', secondary=wishlistAssociationTable, back_populates='wishlist_users')
    # Methods _________________________

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'decks': [deck.to_dict() for deck in self.decks],
            'wishlist': [deck.to_dict() for deck in self.wishlistDecks]
        }
