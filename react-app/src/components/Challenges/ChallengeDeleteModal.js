import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteChallenge } from "../../store/challenges";
import './ChallengeDeleteModal.css'

const ChallengeDeleteModal =({challengeId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deleteChallenge(challengeId)).then(closeModal);
        history.push(`/challenges/current`);
    }

    return (
        <div className="challenge-delete-main-container">
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to delete this challenge?</h3>
            <button className='create-update-buttons' onClick={(handleDelete)}>
                {'Yes (Delete Challenge)'}
            </button>
            <button className='create-update-buttons' onClick={closeModal}>
                {'No (Keep Challenge)'}
            </button>
        </div>
    )
}

export default ChallengeDeleteModal;
