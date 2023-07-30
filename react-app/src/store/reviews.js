// _________ACTION_TYPES______________
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const GET_REVIEWS = 'reviews/GET_REVIEWS'
const GET_REVIEW_BY_ID = 'reviews/GET_REVIEW_BY_ID'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

// ___________ACTIONS_________________
const actionLoadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

const actionGetReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const actionGetReviewById = (review) => ({
    type: GET_REVIEW_BY_ID,
    review
})

const actionCreateReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const actionUpdateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})

const actionDeleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

// ___________THUNK_ACTIONS_____________
export const loadAllReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionLoadReviews(data.reviews));
    }
}

export const getAllUserReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews/current`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetReviews(data.reviews))
    }
}

export const getReviewById = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`)

    if (response.ok) {
        const review = await response.json();
        console.log(review, "review inside get thunk")
        dispatch(actionGetReviewById(review))
    }
}

export const createReview = (review) => async dispatch => {
    console.log(review, "review in thunkCreate")
    const response = await fetch(`/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        let newReview = await response.json();
        dispatch(actionCreateReview(newReview));
        return newReview;
    }
}

export const updateReview = (review) => async dispatch => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(actionUpdateReview(updatedReview));
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        dispatch(actionDeleteReview(reviewId))
    }
}
// ___________CREATE_INITIAL_STATE________________
const initialState = {};


// _____________REVIEWS_REDUCER__________________
const reviewReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_REVIEWS:
            let reviewsState = {}
            action.reviews.forEach(review => {
                reviewsState[review.id] = review;
            })
            return {
                ...state,
                ...reviewsState
            }
        case GET_REVIEWS:
            let userReviewsState = {}
            action.reviews.forEach(review => {
                userReviewsState[review.id] = review
            })
            return {
                ...state,
                ...userReviewsState
            }
        case GET_REVIEW_BY_ID:
            return {
                ...state,
                [action.review.id]: action.review

            }
        case CREATE_REVIEW:
            return {
                ...state,
                [action.review.id]: action.review
            }
        case UPDATE_REVIEW:
            return {
                ...state,
                [action.review.id]: { ...state[action.review.id], ...action.review }
            }
        case DELETE_REVIEW:
            newState = { ...state };
            delete newState[action.reviewId]
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;
