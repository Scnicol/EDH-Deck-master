from flask.cli import AppGroup
from .users import seed_users, undo_users
from .decks import seed_decks, undo_decks
from .challenges import seed_challenges, undo_challenges
from .reviews import seed_reviews, undo_reviews
from .cards import seed_cards, undo_cards
from .wishlists import seed_wishlists, undo_wishlists

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_wishlists()
        undo_cards()
        undo_challenges()
        undo_reviews()
        undo_decks()
        undo_users()

    # Add other seed functions here
    seed_users()
    seed_decks()
    seed_challenges()
    seed_reviews()
    seed_cards()
    seed_wishlists()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_wishlists()
    undo_cards()
    undo_challenges()
    undo_reviews()
    undo_decks()
    undo_users()
    # Add other undo functions here
