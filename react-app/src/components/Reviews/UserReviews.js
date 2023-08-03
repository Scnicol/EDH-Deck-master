import { useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllReviews } from '../../store/reviews';
import { getDecks } from '../../store/decks';
import OpenModalButton from '../OpenModalButton';
import ReviewDeleteModal from './ReviewDeleteModal';
import './UserReviews.css'


function UserReviews() {
    const dispatch = useDispatch();
    const history = useHistory();
    const reviews = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)

    if (!user) history.push('/')

    const decks = useSelector(state => state.decks)
    const userReviews = Object.values(reviews).filter(review => review?.reviewerId == user?.id)

    useEffect(() => {
        dispatch(loadAllReviews())
        dispatch(getDecks())
    }, [dispatch])

    if (!reviews || !decks) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className='users-reviews-main-container'>
            <h1 className='review-title'>Your Reviews</h1>
            <div>
                {userReviews.map((review) => (
                    <div className='single-review-container' key={review.id}>
                        <NavLink className='single-review-name' to={`/decks/${review.deckId}`}>
                            Deck: {decks[review.deckId]?.name}
                        </NavLink>
                        <div>
                            rating: {review.rating}
                        </div>
                        <div>
                            description: {review.description}
                        </div>
                        <NavLink className='create-update-buttons' to={`/reviews/current/${review.deckId}/edit/${review.id}`}>
                            Edit Review
                        </NavLink>
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<ReviewDeleteModal reviewId={review.id} />}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserReviews;
