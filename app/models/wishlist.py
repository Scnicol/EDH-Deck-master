from .db import db, environment, SCHEMA

wishlist_association_table = db.Table(
    "wishlists",
    db.Model.metadata,
    db.Column("userId", db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column("deckId", db.Integer, db.ForeignKey('decks.id'), primary_key=True),
)

if environment == "production":
    wishlist_association_table.schema = SCHEMA
