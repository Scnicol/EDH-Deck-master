import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteReview } from "../../store/reviews";

const ReviewDeleteModal = ({ reviewId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deleteReview(reviewId)).then(closeModal);
        history.push(`/reviews/current`);
    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to delete this review?</h3>
            <button onClick={(handleDelete)}>
                {'Yes (Delete Review)'}
            </button>
            <button onClick={closeModal}>
                {'No (Keep Review)'}
            </button>
        </div>
    )

}

export default ReviewDeleteModal;
