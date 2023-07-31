import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateReview } from '../../store/reviews';
import { getReviewById } from '../../store/reviews';
import ReviewForm from './ReviewsForm';


function UpdateReviewForm() {
    const {deckId, reviewId} = useParams();
    const dispatch = useDispatch();

    const review = useSelector(state => state.reviews[reviewId])

    useEffect(() => {
        dispatch(getReviewById(reviewId))
    }, [dispatch])

    if (!review) return (
        <h1>Loading...</h1>
    )

    console.log(review, "review inside updateReviewForm")

    function submitAction(review) {
        const newReview = {...review, id: reviewId}
        return updateReview(newReview);
    }

    return (
        <ReviewForm review={review} deckId={deckId} formTitle="Edit" formSubmit="Edit" submitAction={submitAction} pageOnSubmit={'/reviews/current'}/>
    )
}

export default UpdateReviewForm;
