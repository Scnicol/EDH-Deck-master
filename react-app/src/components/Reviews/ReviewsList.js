import { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllReviews } from '../../store/reviews';

function ReviewList({ deckReviews }) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews)

    useEffect(() => {
        dispatch(loadAllReviews())
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
                {deckReviews.map((review) => (

                    <div key={review.id}>
                        rating: {review.rating}
                        description: {review.description}
                    </div>

                ))}
            </div>
        </div>
    )
}

export default ReviewList;
