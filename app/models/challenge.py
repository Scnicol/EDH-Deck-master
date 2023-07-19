from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Challenge(db.Model, UserMixin):
    __tablename__ = 'challenges'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    challengeDate = db.Column(db.DateTime, nullable=False)
    challengerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    challengedId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationships _____________________

    challenger = db.relationship('User', foreign_keys='Challenge.challengerId', back_populates='challenges')
    challenged = db.relationship('User', foreign_keys='Challenge.challengedId', back_populates='challenges')
    
    # Methods _________________________

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'challengeDate': self.challengeDate.isoformat(),
            'challengerId': self.challengerId,
            'challengedId': self.challengedId
        }
