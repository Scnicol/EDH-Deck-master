from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

demo = User(
    username='Demo', email='demo@aa.io', password='password')
marnie = User(
    username='marnie', email='marnie@aa.io', password='password')
bobbie = User(
    username='bobbie', email='bobbie@aa.io', password='password')
aaron = User(
    username='A_A_RON', email='AAron@aa.io', password='password'
)
scot = User(
    username='scotty', email='scotty@aa.io', password='abcdefgh'
)

# Adds a demo user, you can add other users here if you want
def seed_users():

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(aaron)
    db.session.add(scot)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
