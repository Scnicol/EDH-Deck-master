import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardSearch from '../CardSearch/CardSearch';

function DeckForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [newCard, setNewCard] = useState(null)
    const [cards, setCards] = useState([])

    // ____________VALIDATION_ERRORS______________
    const [errors, setErrors] = useState({ name: [], description: []})

    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const addCard = (e) => cards.append(e)

    // useEffect(() => {
    //     // dispatch()
    // }, [dispatch])

    const currentUser = useSelector(state => state.session.user)

    if (!currentUser) {
        return (
            <h1>User must be logged in</h1>
        )
    }

    const handleAddCard = () => {
        setCards((prevCards) => [
            ...prevCards,

        ])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deck = {
            name,
            description,
            cards,
        }
    }

    // ____VALIDATION_ERROR_CHECK___________


}


export default DeckForm;
