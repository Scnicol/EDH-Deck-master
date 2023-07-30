import { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDeckById } from '../../store/decks';
import { loadAllReviews } from '../../store/reviews';
import ReviewList from '../Reviews/ReviewsList';
import DeckDeleteModal from './DeckDeleteModal';
import OpenModalButton from '../OpenModalButton';
import AddDeckModal from '../Wishlist/AddDeckModal';


const DeckDetails = () => {
    const { deckId } = useParams();
    const dispatch = useDispatch();

    const deck = useSelector(state => state.decks[deckId])
    const user = useSelector(state => state.session.user)
    const reviews = Object.values(useSelector(state => state.reviews))
    const deckReviews = reviews.filter(review => review.deckId == deckId)

    useEffect(() => {
        dispatch(getDeckById(deckId))
        dispatch(loadAllReviews())
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
                {user && user.id != deck.creatorId && <div>
                <OpenModalButton
                        buttonText="Add to Wishlist"
                        modalComponent={<AddDeckModal deckId={deck.id} />}
                    />
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
