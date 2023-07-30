import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { loadAllReviews, updateReview } from '../../store/reviews';
import { getReviewById } from '../../store/reviews';
import ReviewForm from './ReviewsForm';


function UpdateReviewForm() {
    const {deckId, reviewId} = useParams();
    const dispatch = useDispatch();

    console.log(reviewId, "review ID")

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
        <ReviewForm review={review} deckId={deckId} formTitle="Edit" formSubmit="Edit" submitAction={submitAction} />
    )
}

export default UpdateReviewForm;
