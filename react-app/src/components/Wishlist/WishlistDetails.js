import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../store/users';
import { getDecks } from '../../store/decks';
import OpenModalButton from '../OpenModalButton';
import RemoveDeckModal from './RemoveDeckModal';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './WishList.css'


const WishlistDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();


    const userId = useSelector(state => state.session.user?.id)
    if (!userId) history.push('/')

    const user = useSelector(state => state.users[userId])

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getDecks())
    }, [dispatch])

    if (!user) {
        return (
            <h1>Loading...</h1>
        )
    }


    return (
        <div className='wishlist-main-container'>
            <h1 className='wishlist-title'>Users Wishlist</h1>
            <div className='wishlist-list-container'>
                {user.wishlist.map((deck) => (
                    <div key={deck.id}>
                        <NavLink className='create-update-buttons' to={`/decks/${deck.id}`}>
                            {deck.name}
                        </NavLink>
                        <OpenModalButton
                            buttonText="Remove"
                            modalComponent={<RemoveDeckModal deckId={deck.id} dispatch={dispatch}/>}
                        />
                    </div>

                ))}
            </div>
        </div>
    )
}

export default WishlistDetails;
