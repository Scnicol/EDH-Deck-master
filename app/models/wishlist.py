from .db import db

wishlist_association_table = db.Table(
    "wishlists",
    db.Column("userId", db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column("deckId", db.Integer, db.ForeignKey('decks.id'), primary_key=True),
)
