import { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllReviews } from '../../store/reviews';
import { getUsersDecks } from '../../store/decks';


function UserReviews() {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)
    const decks = useSelector(state => state.decks)
    const userReviews = Object.values(reviews).filter(review => review.reviewerId == user.id)

    useEffect(() => {
        dispatch(loadAllReviews())
        dispatch(getUsersDecks())
    }, [dispatch])

    if (!reviews) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            <h1>Reviews</h1>
            <div>
                {userReviews.map((review) => (
                    <div key={review.id}>
                        <div>
                            rating: {review.rating}
                        </div>
                        <div>
                            description: {review.description}
                        </div>
                        <NavLink to={`/reviews/current/${review.deckId}/edit/${review.id}`}>
                            Edit Review
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserReviews;
