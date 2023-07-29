import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../store/decks";


const DeckDeleteModal = ({ deckId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deleteDeck(deckId)).then(closeModal);
        history.push(`/decks/current`);
    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to delete this deck?</h3>
            <button onClick={(handleDelete)}>
                {'Yes (Delete Deck)'}
            </button>
            <button onClick={closeModal}>
                {'No (Keep Deck)'}
            </button>
        </div>
    )
}

export default DeckDeleteModal;
