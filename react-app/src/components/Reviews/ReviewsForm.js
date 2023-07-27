import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadAllReviews } from '../../store/reviews';
import { getDeckById } from '../../store/decks';


function ReviewForm({review, deckId, submitAction, formSubmit}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [rating, setRating] = useState(review.rating);
    const [description, setDescription] = useState('');

    // ________VALIDATION_ERRORS_STATE____________
    const [errors, setErrors] = useState({ rating: [], description: [] })

    const updateRating = (e) => setRating(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);

    const deck = useSelector(state => state.decks[deckId])
    // const deck = Object.values(decks).filter(deck => deck.id == deckId)
    console.log(deck, "deck for create a review")
    useEffect(() => {
        dispatch(loadAllReviews())
        dispatch(getDeckById(deckId))
    },[dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            deckId,
            rating,
            description,
        };

        // ____VALIDATION_ERRORS________

        let newReview;
        newReview = await dispatch(submitAction(payload))

        if (newReview) {
            history.push(`/reviews/current`);
        }
    };

    if (!deck) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            <h1>Create your review for {deck.name}</h1>
            <form onSubmit={handleSubmit}>
                <p>Description</p>
                <input
                type="text"
                placeholder="Describe your review"
                value={description}
                onChange={updateDescription}
                />
                <p>Give the deck a rating</p>
                <input
                    type="number"
                    placeholder="0"
                    min="0"
                    max="5"
                    value={rating}
                    onChange={updateRating}
                />
                <h2>
                    <button type="submit" disabled={description.length == 0 || rating.length == 0}>{formSubmit} Review</button>
                </h2>
            </form>
        </div>
    )

}

export default ReviewForm;
