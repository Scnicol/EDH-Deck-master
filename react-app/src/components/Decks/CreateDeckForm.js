import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardSearch from '../CardSearch/CardSearch';
import DeckForm from './DeckForm';
import { createDeck } from '../../store/decks';

function CreateDeckForm() {

    const deck = {
        name: 'New Deck',
        description: 'Random new stuff Deck Ya',
        cards: [
            {
                "count": 1,
                "name": "Aetherflux Reservoir",
                "mtgId": "09425292-e65b-5127-8caa-511d1aa96e05",
                "imageUrl": "https://static.tappedout.net/mtg-cards-2/the-brothers-war-retro-artifacts/aetherflux-reservoir/femme-fatale-aetherflux-reservoir-brr-16840440360.png"
            },
            {
                "count": 1,
                "name": "Altar of Dementia",
                "mtgId": "2e65d443-7d9c-525b-b40a-9da99339c64f",
                "imageUrl": "https://static.tappedout.net/mtg-cards-2/the-brothers-war-retro-artifacts/altar-of-dementia/femme-fatale-altar-of-dementia-brr-16840440740.png"
            }
        ]
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
