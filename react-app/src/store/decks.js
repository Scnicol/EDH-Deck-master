// ___________ACTION_TYPES___________________
const LOAD_DECKS = 'decks/LOAD_DECKS'
const LOAD_USERS_DECKS = 'decks/LOAD_USERS_DECKS'
const GET_DECK_BY_ID = 'decks/GET_DECK_BY_ID'
const CREATE_DECK = 'decks/CREATE_DECK'
const UPDATE_DECK = 'decks/UPDATE_DECK'
const DELETE_DECK = 'decks/DELETE_DECK'

// ___________ACTIONS______________________
const loadDecks = (decks) => ({
    type: LOAD_DECKS,
    decks,
})

const loadUsersDecks = (decks) => ({
    type: LOAD_USERS_DECKS,
    decks,
})

const loadDeckById = (deck) => ({
    type: GET_DECK_BY_ID,
    deck,
})

const loadCreateDeck = (deck) => ({
    type: CREATE_DECK,
    deck,
})

const loadUpdateDeck = (deck) => ({
    type: UPDATE_DECK,
    deck
})

const actionDeleteDeck = (deckId) => ({
    type: DELETE_DECK,
    deckId
})


// ________THUNK_ACTIONS_________________
export const getDecks = () => async dispatch => {
    const response = await fetch(`/api/decks`)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadDecks(data.decks))
    }
}

export const getUsersDecks = () => async dispatch => {
    const response = await fetch(`/api/decks/current`)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadUsersDecks(data.decks))
    }
}

export const getDeckById = (deckId) => async dispatch => {
    const response = await fetch(`/api/decks/${deckId}`)

    if (response.ok) {
        const deck = await response.json();
        dispatch(loadDeckById(deck))
    }
}

export const createDeck = (deck) => async dispatch => {
    const response = await fetch(`/api/decks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deck)
    });


    if (response.ok) {
        const newDeck = await response.json();
        dispatch(loadCreateDeck(newDeck));
        return newDeck;
    }
}

export const updateDeck = (deck) => async dispatch => {
    const response = await fetch(`/api/decks/${deck.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deck)
    })

    if (response.ok) {
        const updatedDeck = await response.json();
        dispatch(loadUpdateDeck(updatedDeck));
        return updatedDeck;
    }
}

export const deleteDeck = (deckId) => async dispatch => {
    const response = await fetch(`/api/decks/${deckId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(actionDeleteDeck(deckId));
    }
}

//______CREATE_INITIAL_STATE______________
const initialState = {};

// _______DECKS_REDUCER________________
const decksReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_DECKS:
            let decksState = {}
            action.decks.forEach(deck => {
                decksState[deck.id] = deck;
            })
            return {
                ...state,
                ...decksState
            }

        case LOAD_USERS_DECKS:
            let userDecksState = {}
            action.decks.forEach(deck => {
                userDecksState[deck.id] = deck
            })
            return {
                ...state,
                ...userDecksState
            }
        case GET_DECK_BY_ID:
            return {
                ...state,
                [action.deck.id]: action.deck

            }
        case CREATE_DECK:
            return {
                ...state,
                [action.deck.id]: action.deck

            }
        case UPDATE_DECK:
            return {
                ...state,
                [action.deck.id]: { ...state[action.deck.id], ...action.deck }
            }
        case DELETE_DECK:
            newState = { ...state };
            delete newState[action.deckId];
            return newState
        default:
            return state;
    }
}

export default decksReducer;
