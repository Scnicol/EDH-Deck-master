import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadAllReviews } from '../../store/reviews';
import { getDeckById } from '../../store/decks';
import './ReviewForm.css'


function ReviewForm({ review, deckId, submitAction, formSubmit, formTitle, pageOnSubmit }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [rating, setRating] = useState(review.rating);
    const [description, setDescription] = useState(review.description);

    // ________VALIDATION_ERRORS_STATE____________
    const [errors, setErrors] = useState({ rating: [], description: [] })

    const updateRating = (e) => setRating(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);

    const deck = useSelector(state => state.decks[deckId])
    const user = useSelector(state => state.session.user)
    if (!user) history.push('/')
    useEffect(() => {
        dispatch(loadAllReviews())
        dispatch(getDeckById(deckId))
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            deckId,
            rating,
            description,
        };

        // ____VALIDATION_ERRORS________
        const validationErrors = { rating: [], description: [] };
        // if (!rating.length) validationErrors.rating.push('Rating cannot be empty')
        if (description.length < 15) validationErrors.description.push('Description needs 15 or more characters');
        setErrors(validationErrors)

        if (validationErrors.rating.length > 0 || validationErrors.description.length > 0) {
            return;
        }

        let newReview;
        newReview = await dispatch(submitAction(payload))

        if (newReview) {
            history.push(pageOnSubmit);
        }
    };

    if (!deck || !review) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>

            <form className='review-form-main-container' onSubmit={handleSubmit}>
                <h1 className='review-form-title '>{formTitle} your review for {deck.name}</h1>
                <p>Description</p>
                <textarea
                    placeholder="Describe your review"
                    rows="4"
                    value={description}
                    onChange={updateDescription}
                />
                <ul className='form-errors'>
                    {errors.description.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <p>Give the deck a rating</p>
                <input
                    type="number"
                    placeholder="0"
                    min="0"
                    max="5"
                    value={rating}
                    onChange={updateRating}
                />
                <ul className='form-errors'>
                    {errors.rating.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <h2>
                    <button type="submit" disabled={description.length == 0}>{formSubmit} Review</button>
                </h2>
            </form>
        </div>
    )

}

export default ReviewForm;
