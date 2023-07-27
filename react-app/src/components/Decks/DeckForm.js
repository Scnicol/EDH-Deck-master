import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardSearch from '../CardSearch/CardSearch';

function DeckForm({ }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [newCard, setNewCard] = useState(null)
    const [cards, setCards] = useState({})

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
                [newCard.id]: { ...newCard, count: 1 }
            }
        })
    }

    const handleUpdateCardCount = (card, count) => {
        setCards(function (prevCards) {
            return {
                ...prevCards,
                [card.id]: { ...card, count: count }
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deck = {
            name,
            description,
            cards,
        }
    }

    // ____VALIDATION_ERROR_CHECK___________
    // TODO add fields for name and description
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {sortedCards.map((card) => (
                        <div key={card.id}>
                            <input
                                type="number"
                                min="1"
                                value={card.count}
                                onChange={(e) => { handleUpdateCardCount(card, e.target.value) }}
                            />
                            {card.count}x {card.name}
                            {/* <img src={(card?.imageUrl)} /> */}
                        </div>
                    ))}
                </div>
                <div>
                    <CardSearch onAddCard={handleAddCard} />
                </div>
                <button type="submit">create deck</button>
            </form>

        </div>
    )



}


export default DeckForm;
