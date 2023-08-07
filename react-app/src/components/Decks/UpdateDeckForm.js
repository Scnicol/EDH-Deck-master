import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDeckById } from '../../store/decks';
import { updateDeck } from '../../store/decks';
import DeckForm from './DeckForm';

function UpdateDeckForm() {
    const {deckId} = useParams();
    const dispatch = useDispatch();

    const deck = useSelector(state => state.decks[deckId])

    useEffect(() => {
        dispatch(getDeckById(deckId))
    },[dispatch])

    if (!deck) {
        return (
            <h1>Loading...</h1>
        )
    }

    function submitAction(deck) {
        const newDeck = {...deck, id: deckId}
        return updateDeck(newDeck)
    }

    return (
        <DeckForm deck={deck} deckId={deckId} formtTitle="Edit" formSubmit="Edit" submitAction={submitAction}/>
    )
}

export default UpdateDeckForm;
