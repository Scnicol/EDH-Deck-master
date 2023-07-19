from .db import db


# class Wishlist(db.Model, UserMixin):
#     __tablename__ = 'wishlists'

#     if environment == 'production':
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#     deckId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('decks.id')), nullable=False)

wishlist_association_table = db.Table(
    "wishlists",
    db.Column("userId", db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column("deckId", db.Integer, db.ForeignKey('decks.id'), primary_key=True),
)
