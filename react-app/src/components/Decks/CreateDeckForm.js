import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardSearch from '../CardSearch/CardSearch';
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
        <DeckForm deck={deck} submitAction={submitAction} />
    )
}

export default CreateDeckForm;
