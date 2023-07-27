import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, Route, useParams } from 'react-router-dom';
import { getDecks, getUsersDecks } from '../../store/decks';
import { loadAllChallenges } from '../../store/challenges';
import { imageDisplay } from '../../helperFunctions';
import CardSearch from '../CardSearch/CardSearch';

const HomePage = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const decks = Object.values(useSelector(state => state.decks))

    useEffect(() => {
        dispatch(getDecks());
    }, [dispatch]);

    if (decks.length == 0) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <main>
            <div>
                EDH DECK MASTER!
            </div>
            
            <div>
                Decks
                <div>
                    {decks.map((deck) => (
                        <NavLink key={deck.id} to={`/decks/${parseInt(deck.id)}`}>
                            <div>
                                {deck.name}

                                <img src={(deck.cards[0]?.imageUrl)}/>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default HomePage;
