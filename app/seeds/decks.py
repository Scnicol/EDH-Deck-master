from app.models.deck import db, Deck, environment, SCHEMA
from sqlalchemy.sql import text

def seed_decks():
    deck1 = Deck(
        creatorId=1,
        name="Chiss-Goria, Forge Tyrant",
        description="Affinity for Artifacts mono red big artifacts"
    )

    deck2 = Deck(
        creatorId=2,
        name="Nezahal The World Destroyer",
        description="Card draw control mono blue"
    )

    deck3 = Deck(
        creatorId=3,
        name="Glissa why you be a traitor?",
        description="token creation for opponents, kill their tokens to get back artifacts to control game"
    )

    deck4 = Deck(
        creatorId=1,
        name="shootin all my lasers",
        description="U/R control ping for 1 damage to get commander to shoot things for 2 more, cantrip spellslinger"
    )

    db.session.add(deck1)
    db.session.add(deck2)
    db.session.add(deck3)
    db.session.add(deck4)
    db.session.commit()

def undo_decks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.decks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM decks"))

    db.session.commit()
