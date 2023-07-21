from app.models.review import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        description="I love your affinity idea for your deck and it looks fun!",
        rating=5,
        reviewerId=4,
        deckId=1
    )

    review2 = Review(
        description="mono red so hard to build, you did a good job",
        rating=4,
        reviewerId=3,
        deckId=1
    )
    review3 = Review(
        description="eeewww typical mono blue counterspell controll, no flavor at all",
        rating=1,
        reviewerId=5,
        deckId=2
    )
    review4 = Review(
        description="Isn't card draw and control so much fun? love your addition of draw mechanics!",
        rating=4,
        reviewerId=1,
        deckId=2
    )
    review5 = Review(
        description="could probably use a bit more safety measures, but still decent",
        rating=3,
        reviewerId=2,
        deckId=3
    )
    review6 = Review(
        description="I love this idea! adding some of the combos to my new deck I'm making",
        rating=5,
        reviewerId=2,
        deckId=3
    )
    review7 = Review(
        description="Yay artifact decks unite! awesome deck!",
        rating=5,
        reviewerId=1,
        deckId=3
    )
    review8 = Review(
        description="seems like you want to play MTG by yourself while you take long turns, hate these kind of decks",
        rating=1,
        reviewerId=1,
        deckId=4
    )
    review9 = Review(
        description="spellslinger seems ok, you should add more sustainability instead of being a one trick deck",
        rating=3,
        reviewerId=2,
        deckId=4
    )
    review10 = Review(
        description="I tried a ping version of this deck and he's a super fun commander, love the spellslinging thought process",
        rating=5,
        reviewerId=3,
        deckId=4
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
