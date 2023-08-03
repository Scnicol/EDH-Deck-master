import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteReview } from "../../store/reviews";
import './ReviewDeleteModal.css'

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
        <div className="review-delete-main-container">
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to delete this review?</h3>
            <button className='create-update-buttons' onClick={(handleDelete)}>
                {'Yes (Delete Review)'}
            </button>
            <button className='create-update-buttons' onClick={closeModal}>
                {'No (Keep Review)'}
            </button>
        </div>
    )

}

export default ReviewDeleteModal;
