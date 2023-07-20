from app.models.card import db, Card, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cards():
    card1 = Card (
        deckId=1,
        count=1,
        name="Chiss-Goria, Forge Tyrant",
        imageUrl="https://static.tappedout.net/mtg-cards-2/phyrexia-all-will-be-one-commander/chiss-goria-forge-tyrant/femme_fatale-en_d52e5ffa0a-16751994700.png",
    )
    card2 = Card (
        deckId=1,
        count=1,
        name="Academy Manufactor",
        imageUrl="https://static.tappedout.net/mtg-cards-2/march-of-the-machine-commander/academy-manufactor/Academy_Manufactor-MOC.jpg",

    )
    card3 = Card (
        deckId=1,
        count=1,
        name="Ancient Copper Dragon",
        imageUrl="https://static.tappedout.net/mtg-cards-2/battle-for-baldurs-gate/ancient-copper-dragon/femme_fatale-ancient-copper-dragon-clb-16554435670.png",

    )
    card4 = Card (
        deckId=1,
        count=1,
        name="Blightsteel Colossus",
        imageUrl="https://static.tappedout.net/mtg-cards-2/double-masters/blightsteel-colossus/mtg-cards/_user-added/femme_fatale-blightsteel-colossus-2xm-15901170370.png",

    )
    card5 = Card (
        deckId=1,
        count=1,
        name="Dockside Extortionist",
        imageUrl="https://static.tappedout.net/mtg-cards-2/commander-2019/dockside-extortionist/mtg-cards/_user-added/femme_fatale-dockside-extortionist-c19-15652080820.png",

    )
    card6 = Card (
        deckId=1,
        count=28,
        name="Mountain",
        imageUrl="https://static.tappedout.net/mtg-cards-2/the-lord-of-the-rings-tales-of-middle-earth/mountain/femme-fatale-mountain-268-ltr-16855088720.jpg",
    )



    card7 = Card (
        deckId=2,
        count=1,
        name="Nezahal, Primal Tide",
        imageUrl="https://s.tappedout.net/s1/img/foil-card-overlay-2.1dd09a9145f4.png"

    )
    card8 = Card (
        deckId=2,
        count=1,
        name="Arcanis the Omnipotent",
        imageUrl="https://static.tappedout.net/mtg-cards-2/commander-2017/arcanis-the-omnipotent/mtg-cards/_user-added/pieguy396-arcanis-15078289350.jpg",

    )
    card9 = Card (
        deckId=2,
        count=1,
        name="Archmage Emeritus",
        imageUrl="https://static.tappedout.net/mtg-cards-2/strixhaven/archmage-emeritus/mtg-cards/_user-added/femme_fatale-archmage-emeritus-stx-16168040280.png",

    )
    card10 = Card (
        deckId=2,
        count=1,
        name="Brainstorm",
        imageUrl="https://static.tappedout.net/mtg-cards-2/universes-beyond-warhammer-40k/brainstorm/femme_fatale-brainstorm-40k-16632150680.png",

    )
    card11 = Card (
        deckId=2,
        count=1,
        name="Consecrated Sphinx",
        imageUrl="https://static.tappedout.net/mtg-cards-2/iconic-masters/consecrated-sphinx/mtg-cards/_user-added/pieguy396-consecrated-sphinx-15114033950.jpg",

    )
    card12 = Card (
        deckId=2,
        count=32,
        name="Island",
        imageUrl="https://static.tappedout.net/mtg-cards-2/the-lord-of-the-rings-tales-of-middle-earth/island/femme-fatale-island-264-ltr-16855058430.jpg",

    )



    card13 = Card (
        deckId=3,
        count=1,
        name="Glissa, the Traitor",
        imageUrl="https://s.tappedout.net/s1/img/foil-card-overlay-2.1dd09a9145f4.png",

    )
    card14 = Card (
        deckId=3,
        count=1,
        name="Arcbound Ravager",
        imageUrl="https://static.tappedout.net/mtg-cards-2/darksteel/arcbound-ravager/arcbound-ravager-cropped.jpg",

    )
    card15 = Card (
        deckId=3,
        count=1,
        name="Armix, Filigree Thrasher",
        imageUrl="https://static.tappedout.net/mtg-cards-2/the-brothers-war-commander/armix-filigree-thrasher/Armix_Filigree_Thrasher-BRC.jpg",

    )
    card16 = Card (
        deckId=3,
        count=1,
        name="Braids, Arisen Nightmare",
        imageUrl="https://static.tappedout.net/mtg-cards-2/dominaria-united/braids-arisen-nightmare/femme_fatale-braids-arisen-nightmare-dmu-16608735410.png",

    )
    card17 = Card (
        deckId=3,
        count=1,
        name="Burnished Hart",
        imageUrl="https://static.tappedout.net/mtg-cards-2/march-of-the-machine-commander/burnished-hart/Burnished_Hart-MOC.jpg",

    )
    card18 = Card (
        deckId=3,
        count=14,
        name="Forest",
        imageUrl="https://static.tappedout.net/mtg-cards-2/the-lord-of-the-rings-tales-of-middle-earth/forest/femme-fatale-forest-270-ltr-16855045710.jpg",

    )
    card19 = Card (
        deckId=3,
        count=14,
        name="Swamp",
        imageUrl="https://static.tappedout.net/mtg-cards-2/the-lord-of-the-rings-tales-of-middle-earth/swamp/femme-fatale-swamp-266-ltr-16855164460.jpg",

    )




    card20 = Card (
        deckId=4,
        count=1,
        name="Ghyrson Starn, Kelermorph",
        imageUrl="https://static.tappedout.net/mtg-cards-2/universes-beyond-warhammer-40k/ghyrson-starn-kelermorph/femme_fatale-ghyrson-starn-kelermorph-40k-16631247490.png",

    )
    card21 = Card (
        deckId=4,
        count=1,
        name="Blisterspit Gremlin",
        imageUrl="https://static.tappedout.net/mtg-cards-2/jumpstart-2022/blisterspit-gremlin/femme_fatale-blisterspit-gremlin-j22-16692807010.png",

    )
    card22 = Card (
        deckId=4,
        count=1,
        name="Caltrops",
        imageUrl="https://static.tappedout.net/mtg-cards-2/seventh-edition/caltrops/caltrops.jpg",

    )
    card23 = Card (
        deckId=4,
        count=1,
        name="Circle of Flame",
        imageUrl="https://static.tappedout.net/mtg-cards/m15/circle-of-flame.jpg",

    )
    card24 = Card (
        deckId=4,
        count=1,
        name="Curiosity",
        imageUrl="https://static.tappedout.net/mtg-cards-2/jumpstart/curiosity/mtg-cards/_user-added/femme_fatale-curiousity-jmp-15927971130.png",

    )
    card25 = Card (
        deckId=4,
        count=15,
        name="Mountain",
        imageUrl="https://static.tappedout.net/mtg-cards-2/the-lord-of-the-rings-tales-of-middle-earth/mountain/femme-fatale-mountain-268-ltr-16855088720.jpg",

    )
    card26 = Card (
        deckId=4,
        count=17,
        name="Island",
        imageUrl="https://static.tappedout.net/mtg-cards-2/the-lord-of-the-rings-tales-of-middle-earth/island/femme-fatale-island-264-ltr-16855058430.jpg",
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
