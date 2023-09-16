import { useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersDecks } from '../../store/decks';
import './DeckList.css'
import { imageDisplay } from '../../helperFunctions';

function DeckList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const decks = useSelector(state => state.decks)
    const user = useSelector(state => state.session.user)
    if (!user) history.push('/')
    const userDecks = Object.values(decks).filter(deck => deck.creatorId == user?.id)

    useEffect(() => {
        dispatch(getUsersDecks());
    }, [dispatch])

    if (!decks) {
        return (
            <h1>No decks</h1>
        )
    }

    return (
        <div >
            <div className='decks-header-container'>
                <div className="users-decks">
                    Your Decks
                </div>
                <div>
                    <NavLink className="create-deck" to="/decks/current/new">
                        Create a Deck
                    </NavLink>
                </div>
            </div>

            <div className='decks-inner-container'>

                <div className='decks-display-container'>
                    {userDecks.map((deck) => (
                        <div className="deck-details" key={deck.id}>
                            <NavLink className="" to={`/decks/${deck.id}`}>
                                <div className='decks-list-names'>
                                    {deck.name}
                                </div>
                                <img className="card-image" src={imageDisplay(deck)} />
                            </NavLink>
                            <div className="deck-description">
                                {deck.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default DeckList;
