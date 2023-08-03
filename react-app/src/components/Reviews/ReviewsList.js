import './ReviewsList.css'

function ReviewList({ deckReviews }) {

    return (
        <div>
            <h1 className='reviews-title'>Reviews</h1>
            <div className='decks-reviews-main-container'>
                {deckReviews.map((review) => (
                    <div className="decks-reviews" key={review.id}>
                        <div>{review.reviewerName}</div>
                        <div>rating: {review.rating}</div>
                        <div>description: {review.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReviewList;
