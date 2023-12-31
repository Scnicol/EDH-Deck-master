import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { removeFromWishlist } from "../../store/users";

const RemoveDeckModal = ({deckId, dispatch}) => {

    const {closeModal} = useModal()

    const handleRemove = async (e) => {
        e.preventDefault();

        await dispatch(removeFromWishlist(deckId)).then(closeModal);
    }

    return (
        <div>
            <h2>Confirm Removal</h2>
            <h3>Are you sure you want to remove this deck?</h3>
            <button onClick={(handleRemove)}>
                {'Yes (Remove Deck)'}
            </button>
            <button onClick={closeModal}>
                {'No (Keep Deck)'}
            </button>
        </div>
    )
}

export default RemoveDeckModal;
