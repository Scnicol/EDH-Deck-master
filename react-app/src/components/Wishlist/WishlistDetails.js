import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../store/users';
import { getDecks } from '../../store/decks';
import OpenModalButton from '../OpenModalButton';
import RemoveDeckModal from './RemoveDeckModal';


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
        <div>
            <h1>Users Wishlist</h1>
            <div>
                {user.wishlist.map((deck) => (
                    <div key={deck.id}>
                        <div>
                            {deck.name}
                        </div>
                        <OpenModalButton
                            buttonText="Remove"
                            modalComponent={<RemoveDeckModal deckId={deck.id}/>}
                        />
                    </div>

                ))}
            </div>
        </div>
    )
}

export default WishlistDetails;
