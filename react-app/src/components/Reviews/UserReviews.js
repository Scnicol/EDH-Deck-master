import { useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllReviews } from '../../store/reviews';
import { getDecks } from '../../store/decks';
import OpenModalButton from '../OpenModalButton';
import ReviewDeleteModal from './ReviewDeleteModal';


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
        <div>
            <h1>Reviews</h1>
            <div>
                {userReviews.map((review) => (
                    <div key={review.id}>
                        <div>
                            {decks[review.deckId]?.name}
                            </div>
                        <div>
                            rating: {review.rating}
                        </div>
                        <div>
                            description: {review.description}
                        </div>
                        <NavLink to={`/reviews/current/${review.deckId}/edit/${review.id}`}>
                            Edit Review
                        </NavLink>
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<ReviewDeleteModal reviewId={review.id}/>}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserReviews;
