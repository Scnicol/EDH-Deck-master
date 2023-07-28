import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardSearch from '../CardSearch/CardSearch';

function DeckForm({ submitAction, deck, formTitle, formSubmit}) {

    const dispatch = useDispatch();
    const history = useHistory();
    let deckCards = {}
    deck.cards.forEach(card => {
        deckCards[card.mtgId] = card
    })

    const [name, setName] = useState(deck.name)
    const [description, setDescription] = useState(deck.description)
    const [newCard, setNewCard] = useState(null)
    const [cards, setCards] = useState(deckCards)

    // ____________VALIDATION_ERRORS______________
    const [errors, setErrors] = useState({ name: [], description: [] })

    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const addCard = (e) => cards.append(e)
    const sortedCards = Object.values(cards).toSorted(function (x, y) {
        if (x.name < y.name) {
            return -1;
        }
        if (x.name > y.name) {
            return 1;
        }
        return 0;
    })

    // useEffect(() => {
    //     // dispatch()
    // }, [dispatch])

    const currentUser = useSelector(state => state.session.user)

    if (!currentUser) {
        return (
            <h1>User must be logged in</h1>
        )
    }

    const handleAddCard = (newCard) => {
        setCards(function (prevCards) {
            return {
                ...prevCards,
                [newCard.id]: { name: newCard.name, mtgId: newCard.id , imageUrl: newCard.imageUrl , count: 1 }
            }
        })
    }

    const handleRemoveCard = (removedCard) => {
        setCards(function (prevCards) {
            let newCards = {...prevCards}
            delete newCards[removedCard.mtgId]
            return newCards;
        })
    }

    const handleUpdateCardCount = (card, count) => {
        setCards(function (prevCards) {
            return {
                ...prevCards,
                [card.mtgId]: { ...card, count: count }
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deck = {
            name,
            description,
            cards: Object.values(cards),
        }
        // ____VALIDATION_ERROR_CHECK___________


        let newDeck;
        newDeck = await dispatch(submitAction(deck))

        if (newDeck) {
            history.push(`/decks/current`)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>{formTitle} your deck</h2>
                <p>Please give your deck a name</p>
                <input
                    type="text"
                    placeholder="Name your deck"
                    value={name}
                    onChange={updateName}
                />
                <p>Please give your deck a description</p>
                <textarea
                    type="textarea"
                    placeholder="My deck does..."
                    value={description}
                    onChange={updateDescription}
                />
                <div>
                    {sortedCards.map((card) => (
                        <div key={card.mtgId}>
                            <input
                                type="number"
                                min="1"
                                value={card.count}
                                onChange={(e) => { handleUpdateCardCount(card, e.target.value) }}
                            />
                            {card.count}x {card.name}
                            <button onClick={(e) => handleRemoveCard(card)}>X</button>
                        </div>
                    ))}
                </div>
                <div>
                    <CardSearch onAddCard={handleAddCard} />
                </div>
                <button type="submit">{formSubmit} deck</button>
            </form>
        </div>
    )
}


export default DeckForm;
