import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { addToWishList } from "../../store/users";

const AddDeckModal = ({ deckId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const handleAdd = async (e) => {
        e.preventDefault();

        await dispatch(addToWishList(deckId)).then(closeModal);
    }

    return (
        <div>
            <h3>Add this deck to your wishlist?</h3>
            <button onClick={(handleAdd)}>
                {'Yes'}
            </button>
            <button onClick={closeModal}>
                {'No'}
            </button>
        </div>
    )
}

export default AddDeckModal;
