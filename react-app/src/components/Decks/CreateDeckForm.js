import DeckForm from './DeckForm';
import { createDeck } from '../../store/decks';

function CreateDeckForm() {

    const deck = {
        name: '',
        description: '',
        cards: []
    }

    function submitAction(deck) {
        const newDeck = {...deck}
        return createDeck(newDeck)
    }

    return (
        <DeckForm deck={deck} submitAction={submitAction} formTitle="Create" formSubmit="Create"/>
    )
}

export default CreateDeckForm;
