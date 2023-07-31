import { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDeckById } from '../../store/decks';
import { loadAllReviews } from '../../store/reviews';
import ReviewList from '../Reviews/ReviewsList';
import DeckDeleteModal from './DeckDeleteModal';
import OpenModalButton from '../OpenModalButton';
import { getUserById } from '../../store/users';
import { removeFromWishlist } from '../../store/users';
import { addToWishList } from '../../store/users';


const DeckDetails = () => {
    const { deckId } = useParams();
    const dispatch = useDispatch();

    const deck = useSelector(state => state.decks[deckId])
    const user = useSelector(state => state.session.user)
    const reviews = Object.values(useSelector(state => state.reviews))
    const deckReviews = reviews.filter(review => review.deckId == deckId)
    const currUserWishlist = useSelector(state => state.users[user?.id]?.wishlist)
    const isInWishlist = currUserWishlist?.some((e) => e.id == deckId)

    const handleRemove = async (e) => {
        e.preventDefault();

        await dispatch(removeFromWishlist(deckId))
    }

    const handleAdd = async (e) => {
        e.preventDefault();

        await dispatch(addToWishList(deckId));
    }

    useEffect(() => {
        dispatch(getDeckById(deckId))
        dispatch(loadAllReviews())
        dispatch(getUserById(user?.id))
    }, [dispatch])

    if (!deck) return (
        <h1>Deck Doesn't Exist</h1>
    )

    return (
        <div>
            <div>
                <h1>{deck.name}</h1>
                <h2>{deck.description}</h2>
                <img src={(deck.cards[0]?.imageUrl)} />
            </div>
            <div>
                {deck.cards.map((card) => (
                    <div key={card.id}>
                        {card.count}x {card.name}
                    </div>
                ))}
            </div>
            {user?.id == deck.creatorId &&
                <div>
                    <NavLink to={`current/${deckId}/edit`}>
                        Edit Deck
                    </NavLink>
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeckDeleteModal deckId={deckId} />}
                    />
                </div>}
            {user && user.id != deck.creatorId && !isInWishlist && <div>
                <div>
                    <button onClick={handleAdd}>Add to wishlist</button>
                </div>

            </div>}
            {user && isInWishlist &&
                <div>

                    <button onClick={handleRemove}>Remove from wishlist</button>
                </div>}
            {user && user.id != deck.creatorId && <div>
                <NavLink to={`/challenges/current/${deck.creatorId}`}>Challenge Creator</NavLink>
            </div>}
            <div>
                <ReviewList deckReviews={deckReviews} />
            </div>

            {user && user.id != deck.creatorId && <NavLink to={`/reviews/current/${deckId}`}>
                Leave a Review
            </NavLink>}
        </div>
    )
}

export default DeckDetails;
