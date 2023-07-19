from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Card(db.Model, UserMixin):
    __tablename__ = 'cards'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    deckId = db.Column(db.Integer, db.ForeingKey(add_prefix_for_prod('decks.id')))
    count = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    imageUrl = db.Column(db.String(600), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships _____________________


    # Methods _________________________

    def to_dict(self):
        return {
            'id': self.id,
            'deckId': self.deckId,
            'count': self.count,
            'name': self.name,
            'imageUrl': self.imageUrl,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        }
