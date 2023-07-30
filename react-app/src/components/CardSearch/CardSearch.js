import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const mtg = require('mtgsdk')

const CardSearch = ({onAddCard}) => {

    const dispatch = useDispatch()

    const [cardName, setCardName] = useState('')
    const [cardResults, setCardResults] = useState([])

    const updateCardName = (e) => setCardName(e.target.value)

    useEffect(() => {
        if (cardName && cardName.length > 1) {
            mtg.card.where({ name: cardName })
                .then(results => {

                    let filteredResults = {}

                    results.filter((card) => {
                        return card.name.toLowerCase().startsWith(cardName.toLowerCase())
                    }).forEach((card) => {
                        filteredResults[card.name] = card
                    })

                    let sortedResults = Object.values(filteredResults).toSorted(function (x, y) {
                        if (x.name < y.name) {
                            return -1;
                        }
                        if (x.name > y.name) {
                            return 1;
                        }
                        return 0;
                    })

                    let finalResults = sortedResults.slice(0, 5);

                    setCardResults(finalResults)
                }).catch((error) => {
                    console.error(error);
                });
        }
    }, [cardName])

    return (
        <div>
            <input
                type="text"
                placeholder='Card Name'
                value={cardName}
                onChange={updateCardName}
            />
            <div>
                {cardResults.map((card) => (
                    <div key={card.id}
                     onClick={(e) => {

                        // console.log("inside CardSearch")
                        onAddCard(card)
                    }}
                     >
                        {card.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardSearch;