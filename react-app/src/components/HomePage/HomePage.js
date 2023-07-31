import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getDecks } from '../../store/decks';
import './HomePage.css';


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
        <main >
            <div className='homepage-main-container'>
                {decks.map((deck) => (
                    <NavLink className='deck-details' key={deck.id} to={`/decks/${parseInt(deck.id)}`}>
                        <div className="deck-name">
                            {deck.name}
                        </div>
                        <div>
                            <img className='card-image' src={(deck.cards[0]?.imageUrl) ?? 'https://t3.ftcdn.net/jpg/03/34/83/22/360_F_334832255_IMxvzYRygjd20VlSaIAFZrQWjozQH6BQ.jpg'} />
                        </div>
                    </NavLink>
                ))}
            </div>
        </main>
    )
}

export default HomePage;
