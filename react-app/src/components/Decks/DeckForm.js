import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardSearch from '../CardSearch/CardSearch';
import './DeckForm.css'

function DeckForm({ submitAction, deck, formTitle, formSubmit }) {

    const dispatch = useDispatch();
    const history = useHistory();
    let deckCards = {}
    deck.cards.forEach(card => {
        deckCards[card.mtgId] = card
    })

    const [name, setName] = useState(deck.name)
    const [description, setDescription] = useState(deck.description)
    const [cards, setCards] = useState(deckCards)

    // ____________VALIDATION_ERRORS______________
    const [errors, setErrors] = useState({ name: [], description: [], cards: [], search: [] })

    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);

    const sortedCards = Object.values(cards).toSorted(function (x, y) {
        if (x.name < y.name) {
            return -1;
        }
        if (x.name > y.name) {
            return 1;
        }
        return 0;
    })

    const currentUser = useSelector(state => state.session.user)

    if (!currentUser) history.push('/')


    const handleAddCard = (newCard) => {
        if (cards[newCard.id]) return;

        setCards(function (prevCards) {
            return {
                ...prevCards,
                [newCard.id]: { name: newCard.name, mtgId: newCard.id, imageUrl: newCard.imageUrl, count: 1 }
            }
        })
    }

    const handleRemoveCard = (removedCard) => {
        setCards(function (prevCards) {
            let newCards = { ...prevCards }
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
        const validationErrors = { name: [], description: [], cards: [], search: [] };
        if (name.length < 1) validationErrors.name.push('Name is required');
        if (name.length > 50) validationErrors.name.push('Name must be less than 50 characters')
        if (description.length < 30) validationErrors.description.push('Description needs 30 or more characters');
        if (description.length > 300) validationErrors.description.push('Description must be less than 300 characters')
        if (deck.cards.length < 1) validationErrors.cards.push('Decks require atleast 1 card in them')
        // const isInWishlist = currUserWishlist?.some((e) => e.id == deckId)
        setErrors(validationErrors)

        if (validationErrors.name.length > 0 || validationErrors.description.length > 0 || validationErrors.cards.length > 0) {
            return;
        }

        let newDeck;
        newDeck = await dispatch(submitAction(deck))

        if (newDeck) {
            history.push(`/decks/${newDeck.id}`)
        }
    }

    return (
        <div className='deck-form-main-container'>
            <form className='deck-form-inner-container ' onSubmit={handleSubmit}>
                <div className='deck-form-information-container'>
                    <h2 className='deck-form-titles'>{formTitle} your deck</h2>
                    <ul className='form-errors'>
                        {errors.cards.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <p className='deck-form-titles'>Please give your deck a name</p>
                    <input
                        className='deck-title-input-size'
                        type="text"
                        placeholder="Name your deck"
                        value={name}
                        onChange={updateName}
                    />
                    <ul className='form-errors'>
                        {errors.name.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <p className='deck-form-titles'>Please give your deck a description</p>
                    <textarea
                        type="textarea"
                        placeholder="My deck does..."
                        rows='8'
                        value={description}
                        onChange={updateDescription}
                    />
                    <ul className='form-errors'>
                        {errors.description.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <div>
                        <button className='create-deck' type="submit">{formSubmit} deck</button>
                    </div>
                </div>
                <div className='add-card-container'>
                    <div className="card-search">
                        <div>
                            Card by name
                        </div>
                        <div>
                            <CardSearch onAddCard={handleAddCard} />
                        </div>
                    </div>
                    <div className='card-list-main-container'>
                        {sortedCards.map((card) => (
                            <div className="deck-list" key={card.mtgId}>
                                <input
                                    className='card-count'
                                    type="number"
                                    min="1"
                                    size="small"
                                    value={card.count}
                                    onChange={(e) => { handleUpdateCardCount(card, e.target.value) }}
                                />
                                <div className='deck-card'>
                                    {card.count}x {card.name}
                                </div>
                                <div>
                                    <button onClick={(e) => handleRemoveCard(card)}>X</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </form>
        </div>
    )
}


export default DeckForm;
