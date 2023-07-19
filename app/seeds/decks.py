from app.models.deck import db, Deck, environment, SCHEMA
from sqlalchemy.sql import text

def seed_decks():
    deck1 = Deck(
        name="Chiss-Goria, Forge Tyrant",
        description="Affinity for Artifacts mono red big artifacts"
    )

    deck2 = Deck(
        name="Nezahal The World Destroyer",
        description="Card draw control mono blue"
    )

    deck3 = Deck(
        name="Glissa why you be a traitor?",
        description="token creation for opponents, kill their tokens to get back artifacts to control game"
    )

    deck4 = Deck(
        name="shootin all my lasers",
        description="U/R control ping for 1 damage to get commander to shoot things for 2 more, cantrip spellslinger"
    )
