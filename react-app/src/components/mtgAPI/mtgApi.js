import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const mtgApi = () => {
    const dispatch = useDispatch()

    const [cardName, setCardName] = useState(null)

    const updateCardName = (e) => setCardName(e.target.value)

    

    return (
        <input
            type="text"
            placeholder='Card Name'
            value={cardName}
            onChange={updateCardName}
        />
    )
}
