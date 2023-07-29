import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteChallenge } from "../../store/challenges";

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
        <div>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to delete this challenge?</h3>
            <button onClick={(handleDelete)}>
                {'Yes (Delete Challenge)'}
            </button>
            <button onClick={closeModal}>
                {'No (Keep Challenge)'}
            </button>
        </div>
    )
}

export default ChallengeDeleteModal;
