

function ReviewList({ deckReviews }) {

    return (
        <div>
            <h1>Reviews</h1>
            <div>
                {deckReviews.map((review) => (

                    <div key={review.id}>
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
