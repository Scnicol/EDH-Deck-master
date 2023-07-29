import { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../store/users';
import { getDecks } from '../../store/decks';

const WishlistDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const userId = useSelector(state => state.session.user.id)
    if (!userId) history.push('/')

    const user = useSelector(state => state.users[userId])

    console.log(user.wishlist[0], "user------")
    // const userWishlist = Object.values(user.wishlist)

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getDecks())
    }, [dispatch])

    return (
        <div>
            <h1>Users Wishlist</h1>
            <div>
                {user.wishlist.map((deck) => (
                    <div key={deck.id}>
                        {deck.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WishlistDetails;
