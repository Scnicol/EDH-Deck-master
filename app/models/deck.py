from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Deck(db.Model, UserMixin):
    __tablename__ = 'decks'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships _____________________


    # Methods _________________________

    def to_dict(self):
        return {
            'id': self.id,
            'creatorId': self.creatorId,
            'name': self.name,
            'description': self.description,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
