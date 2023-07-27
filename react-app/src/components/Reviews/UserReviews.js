import { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllReviews } from '../../store/reviews';


function UserReviews({ deckReviews }) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)
    const userReviews = Object.values(reviews).filter(review => review.reviewerId == user.id)

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
                {userReviews.map((review) => (
                    <div>
                        <div key={review.id}>
                            <div>
                                rating: {review.rating}
                            </div>
                            <div>
                                description: {review.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserReviews;
