from app.models.challenge import db, Challenge, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_challenges():
    challenge1 = Challenge(
        name="EDH game time!",
        description="Only one may stand! I'd like to try my mono red against your mono blue!",
        challengeDate=date(2023, 8, 24),
        challengerId=1,
        challengedId=2
    )

    challenge2 = Challenge(
        name="Nezahal vs Glissa",
        description="meet up for a fun game of commander! I'll buy food for us!",
        challengeDate=date(2023, 8, 17),
        challengerId=2,
        challengedId=3
    )

    challenge3 = Challenge(
        name="Shootin my lasers at you",
        description="I'm testing out my deck would you be willing to oblige?",
        challengeDate=date(2023, 7, 14),
        challengerId=5,
        challengedId=3
    )

    challenge4 = Challenge(
        name="fight fight fight!",
        description="Looking for a more serious game of EDH!",
        challengeDate=date(2023, 6, 24),
        challengerId=2,
        challengedId=5
    )

    challenge5 = Challenge(
        name="Let's gooooooooooooo",
        descriptiong="just out to have fun and I love your deck designs",
        challengeDate=date(2023, 8, 12),
        challengerId=3,
        challengedId=1
    )

    db.session.add(challenge1)
    db.session.add(challenge2)
    db.session.add(challenge3)
    db.session.add(challenge4)
    db.session.add(challenge5)
    db.session.commit()

def undo_challenges():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.challenges RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM challenges"))

    db.session.commit()
