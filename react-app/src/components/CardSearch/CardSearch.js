import { useState, useEffect } from 'react';
const mtg = require('mtgsdk')

const CardSearch = ({ onAddCard }) => {

    const [cardName, setCardName] = useState('')
    const [cardResults, setCardResults] = useState([])
    const [noResults, setNoResults] = useState(false)

    const updateCardName = (e) => setCardName(e.target.value)



    useEffect(() => {
        setNoResults(false)
        if (cardName && cardName.length > 1) {
            let requestToken = mtg.card.where({ name: cardName })
                .then(results => {

                    let filteredResults = {};

                    results.filter((card) => {
                        return card.name.toLowerCase().startsWith(cardName.toLowerCase())
                    }).forEach((card) => {
                        //We turn our results into a Dictionary to remove duplicate names
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

                    let finalResults = sortedResults.slice(0, 15);
                    setNoResults(finalResults.length == 0)
                    setCardResults(finalResults)
                }).catch((error) => {
                    console.error(error);
                });
            return () => {

                requestToken.cancel();
            };
        } else {
            setCardResults([]);
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
                    <div key={card.id} onClick={(e) => { onAddCard(card) }}>
                        {card.name}
                    </div>
                ))}
            </div>
            {noResults && <div>
                no results were found
            </div>}
        </div>
    )
}

export default CardSearch;
