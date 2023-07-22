// ___________ACTION_TYPES___________________
const LOAD_DECKS = 'decks/LOAD_DECKS'

// ___________ACTIONS______________________
const loadDecks = (decks) => ({
    type: LOAD_DECKS,
    decks,
})

// ________THUNK_ACTIONS_________________
export const getDecks = () => async dispatch => {
    const response = await fetch(`/api/decks`)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadDecks(data.Decks))
    }
}

//______CREATE_INITIAL_STATE______________
const initialState = {};

// _______DECKS_REDUCER________________
const decksReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_DECKS:
            action.decks.forEach(deck => {
                newState[deck.id] = tasker;
            })
            return newState
        default:
            return state;
    }
}
