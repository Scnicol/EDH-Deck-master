import { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersDecks } from '../../store/decks';

function DeckList() {
    const dispatch = useDispatch();
    const decks = useSelector(state => state.decks)
    const user = useSelector(state => state.session.user)
    const userDecks = Object.values(decks).filter(deck => deck.creatorId == user.id)

    useEffect(() => {
        dispatch(getUsersDecks());
    }, [dispatch])

    if (!decks) {
        return (
            <h1>No decks</h1>
        )
    }

    return (
        <div>
            <div>
                User's Decks
            </div>
            <div>
                {userDecks.map((deck) => (
                    <div key={deck.id}>
                        <NavLink to={`/decks/${deck.id}`}>
                            {deck.name}
                            <img src={(deck.cards[0]?.imageUrl)} />
                        </NavLink>
                        {deck.description}
                    </div>
                ))}
            </div>
        </div >
    )
}

export default DeckList;
