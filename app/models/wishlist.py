from .db import db, environment, SCHEMA, add_prefix_for_prod

wishlist_association_table = db.Table(
    "wishlists",
    db.Column("userId", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("deckId", db.Integer, db.ForeignKey(add_prefix_for_prod('decks.id')), primary_key=True),
)

if environment == "production":
    wishlist_association_table.schema = SCHEMA
