// ______ACTION_TYPES____________
const GET_USERS = 'users/GET_USERS'
const GET_USER_BY_ID = 'users/GET_USER_BY_ID'
const ADD_TO_USERS_WISHLIST = 'users/ADD_TO_USERS_WISHLIST'
const REMOVE_FROM_USERS_WISHLIST = 'users/REMOVE_FROM_USERS_WISHLIST'

// ______ACTIONS____________
const actionGetUsers = (users) => ({
    type: GET_USERS,
    users
})

const actionGetUserById = (user) => ({
    type: GET_USER_BY_ID,
    user
})

const actionAddToWishlist = (user) => ({
    type: ADD_TO_USERS_WISHLIST,
    user
})

const actionRemoveFromWishlist = (user) => ({
    type: REMOVE_FROM_USERS_WISHLIST,
    user
})

// _______THUNK_ACTIONS___________
export const getUsers = () => async dispatch => {
    const response = await fetch(`/api/users`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetUsers(data.users))
    }
}

export const getUserById = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetUserById(data.userId))
    }
}

export const addToWishList = (deckId) => async dispatch => {
    const response = await fetch(`/api/users/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deckId)
    });

    if (response.ok) {
        let newWishlist = await response.json();
        dispatch(actionAddToWishlist(newWishlist))
    }
}

export const removeFromWishlist = (deckId) => async dispatch => {
    const response = await fetch(`/api/users/wishlist/${deckId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(actionRemoveFromWishlist(deckId))
    }
}

// _____CREATE_INITIAL_STATE_________
const initialState = {};

// _________USERS_REDUCER_____________
const userReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_USERS:
            let usersState = {};
            action.users.forEach(user => {
                usersState[user.id] = user;
            })
            return {
                ...state,
                ...usersState
            }
        case GET_USER_BY_ID:
            return {
                ...state,
                [action.user.id]: action.user
            }
        case ADD_TO_USERS_WISHLIST:
            return {
                ...state,
                [action.user.id]: action.user
            }
        default:
            return state;
    }
}

export default userReducer;
