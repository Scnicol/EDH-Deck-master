import { useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import ReviewForm from './ReviewsForm';


function CreateReviewForm() {
    const {deckId} = useParams();
    const review = {
        rating: '',
        description: '',
    }

    function submitAction(review) {
        const newReview = {...review}
        return createReview(newReview);
    }

    return (
        <ReviewForm review={review} deckId={deckId} formTitle="Create" formSubmit="Create" submitAction={submitAction} />
    )
}

export default CreateReviewForm;
