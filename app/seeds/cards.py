from app.models.card import db, Card, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cards():
    card1 = Card (
        deckId=1,
        count=1,
        name="Chiss-Goria, Forge Tyrant",
        mtgId="780be3d6-0c9c-5dfe-a333-1f9790295dc9",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=605455&type=card",
    )
    card2 = Card (
        deckId=1,
        count=1,
        name="Academy Manufactor",
        mtgId="8a5ba1bf-3ecb-552c-9a77-49f5bc54d21a",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=522295&type=card",

    )
    card3 = Card (
        deckId=1,
        count=1,
        name="Ancient Copper Dragon",
        mtgId="a572dff6-b14d-5771-8fac-aa2f585b3fa3",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=563044&type=card",

    )
    card4 = Card (
        deckId=1,
        count=1,
        name="Blightsteel Colossus",
        mtgId="fa62fc90-4b85-582b-a775-2d1a8d900ffe",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=489908&type=card",

    )
    card5 = Card (
        deckId=1,
        count=1,
        name="Dockside Extortionist",
        mtgId="1104bdaa-8841-5b80-8300-0e8d0fcd33b7",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571440&type=card",

    )
    card6 = Card (
        deckId=1,
        count=28,
        name="Mountain",
        mtgId="c1f98960-ef31-5ec9-af8d-d6d56169047b",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129649&type=card",
    )



    card7 = Card (
        deckId=2,
        count=1,
        name="Nezahal, Primal Tide",
        mtgId="0da28cae-c6ec-5f43-8015-cdac21058bc7",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=500881&type=card",

    )
    card8 = Card (
        deckId=2,
        count=1,
        name="Arcanis the Omnipotent",
        mtgId="6f08f7f6-ecfb-584f-ae7a-c6e4d9c4da35",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=106426&type=card",

    )
    card9 = Card (
        deckId=2,
        count=1,
        name="Archmage Emeritus",
        mtgId="15001167-a3e4-5ca7-a844-f6684641ad1f",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=513514&type=card",

    )
    card10 = Card (
        deckId=2,
        count=1,
        name="Brainstorm",
        mtgId="64329194-cb04-530b-9763-6c331596a1ad",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=489717&type=card",

    )
    card11 = Card (
        deckId=2,
        count=1,
        name="Consecrated Sphinx",
        mtgId="1c66d6f7-adef-57d5-a4e2-90082a650327",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571376&type=card",

    )
    card12 = Card (
        deckId=2,
        count=32,
        name="Island",
        mtgId="2e21d91d-3970-503f-b36a-e2b0e37fb3ee",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129606&type=card",

    )



    card13 = Card (
        deckId=3,
        count=1,
        name="Glissa, the Traitor",
        mtgId="deca8f5b-6828-5f8e-9b54-8888e1d689f3",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=214072&type=card",

    )
    card14 = Card (
        deckId=3,
        count=1,
        name="Arcbound Ravager",
        mtgId="62ae25c1-2958-556e-8992-d82c96d35a42",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=50943&type=card",

    )
    card15 = Card (
        deckId=3,
        count=1,
        name="Armix, Filigree Thrasher",
        mtgId="d46fea1f-e83b-5e62-b4a9-2c1d0f366e3a",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=588714&type=card",

    )
    card16 = Card (
        deckId=3,
        count=1,
        name="Braids, Arisen Nightmare",
        mtgId="0bf470a2-5d71-5df4-bd0a-d9331d1f791b",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=574564&type=card",

    )
    card17 = Card (
        deckId=3,
        count=1,
        name="Burnished Hart",
        mtgId="2ad13352-8e21-5ccb-a810-2d673d0ce3db",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=532587&type=card",

    )
    card18 = Card (
        deckId=3,
        count=14,
        name="Forest",
        mtgId="4a17c998-1a44-5537-b675-b19522d43bee",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129559&type=card",

    )
    card19 = Card (
        deckId=3,
        count=14,
        name="Swamp",
        mtgId="ec72e59f-bc37-50fd-a1b5-3afac5a402b3",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129754&type=card",

    )




    card20 = Card (
        deckId=4,
        count=1,
        name="Ghyrson Starn, Kelermorph",
        mtgId="75797e8b-e31e-5735-8007-4b0905256c96",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=580946&type=card",

    )
    card21 = Card (
        deckId=4,
        count=1,
        name="Blisterspit Gremlin",
        mtgId="4695331e-f056-50ff-924e-1cf1e1cb0bde",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=479628&type=card",

    )
    card22 = Card (
        deckId=4,
        count=1,
        name="Caltrops",
        mtgId="009ef7b7-642c-55d1-a7ac-d632228708db",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=25655&type=card",

    )
    card23 = Card (
        deckId=4,
        count=1,
        name="Circle of Flame",
        mtgId="835c34ce-2bb0-5dbb-b523-525a2b73f280",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=220273&type=card",

    )
    card24 = Card (
        deckId=4,
        count=1,
        name="Curiosity",
        mtgId="a5471d2a-b1ef-5c81-be5f-7ba71277d990",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=45240&type=card",

    )
    card25 = Card (
        deckId=4,
        count=15,
        name="Mountain",
        mtgId="c1f98960-ef31-5ec9-af8d-d6d56169047b",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129649&type=card",

    )
    card26 = Card (
        deckId=4,
        count=17,
        name="Island",
        mtgId="2e21d91d-3970-503f-b36a-e2b0e37fb3ee",
        imageUrl="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129606&type=card",
    )

    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)
    db.session.add(card4)
    db.session.add(card5)
    db.session.add(card6)
    db.session.add(card7)
    db.session.add(card8)
    db.session.add(card9)
    db.session.add(card10)
    db.session.add(card11)
    db.session.add(card12)
    db.session.add(card13)
    db.session.add(card14)
    db.session.add(card15)
    db.session.add(card16)
    db.session.add(card17)
    db.session.add(card18)
    db.session.add(card19)
    db.session.add(card20)
    db.session.add(card21)
    db.session.add(card22)
    db.session.add(card23)
    db.session.add(card24)
    db.session.add(card25)
    db.session.add(card26)
    db.session.commit()

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()
