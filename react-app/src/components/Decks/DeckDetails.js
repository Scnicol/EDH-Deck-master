import { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDeckById } from '../../store/decks';
import { loadAllReviews } from '../../store/reviews';
import ReviewList from '../Reviews/ReviewsList';


const DeckDetails = () => {
    const { deckId } = useParams();
    const dispatch = useDispatch();

    const deck = useSelector(state => state.decks[deckId])
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
            <div>
                <ReviewList deckReviews={deckReviews}/>
            </div>
            <NavLink to={`/reviews/current/${deckId}`}>
                Leave a Review
            </NavLink>
        </div>
    )
}

export default DeckDetails;
