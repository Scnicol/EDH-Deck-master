from app.models.deck import db, Deck, environment, SCHEMA
from sqlalchemy.sql import text
from .decks import deck2, deck1, deck3, deck4
from .users import demo, marnie, bobbie, aaron, scot

def seed_wishlists():
    demo.wishlistDecks.append(deck2)
    demo.wishlistDecks.append(deck3)
    marnie.wishlistDecks.append(deck1)
    bobbie.wishlistDecks.append(deck1)
    aaron.wishlistDecks.append(deck1)
    aaron.wishlistDecks.append(deck2)
    aaron.wishlistDecks.append(deck4)
    scot.wishlistDecks.append(deck3)

    db.session.commit()


def undo_wishlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wishlists"))

    db.session.commit()
