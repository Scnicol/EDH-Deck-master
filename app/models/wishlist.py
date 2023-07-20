from .db import db, environment, SCHEMA, add_prefix_for_prod

# from flask_login import UserMixin
# from datetime import datetime

# class Wishlit(db.Model, UserMixin):
#     __tablename__ = 'decks'

#     if environment == 'production':
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     deckId = db.Column(db.Integer, db.ForeignKey('decks.id'), nullable=False)



wishlist_association_table = db.Table(
    "wishlists",
    db.Model.metadata,
    db.Column("userId", db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column("deckId", db.Integer, db.ForeignKey('decks.id'), nullable = False),
)

if environment == "production":
    wishlist_association_table.schema = SCHEMA
