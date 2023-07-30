// ________ACTION_TYPES______________
const LOAD_CHALLENGES = 'challenges/LOAD_CHALLENGES'
const GET_CHALLENGES = 'challenges/GET_CHALLENGES'
const GET_CHALLENGE_BY_ID = 'challenges/GET_CHALLENGE_BY_ID'
const CREATE_CHALLENGE = 'challenges/CREATE_CHALLENGE'
const UPDATE_CHALLENGE = 'challenges/UPDATE_CHALLENGE'
const DELETE_CHALLENGE = 'challenges/DELETE_CHALLENGE'

// ________ACTIONS___________________
const actionLoadChallenges = (challenges) => ({
    type: LOAD_CHALLENGES,
    challenges
})

const actionGetChallenges = (challenges) => ({
    type: GET_CHALLENGES,
    challenges
})

const actionGetChallengeById = (challenge) => ({
    type: GET_CHALLENGE_BY_ID,
    challenge
})

const actionCreateChallenge = (challenge) => ({
    type: CREATE_CHALLENGE,
    challenge,
})

const actionUpdateChallenge = (challenge) => ({
    type: UPDATE_CHALLENGE,
    challenge,
})

const actionDeleteChallenge = (challengeId) => ({
    type: DELETE_CHALLENGE,
    challengeId,
})

//  _________THUNK_ACTIONS_____________
export const loadAllChallenges = () => async dispatch => {
    const response = await fetch(`/api/challenges`);

    if (response.ok) {
        const data = await response.json();
        dispatch(actionLoadChallenges(data.challenges))
    }
}

export const getAllUserChallenges = () => async dispatch => {
    const response = await fetch(`/api/challenges/current`)
    console.log(response, "response in challenges store")
    if (response.ok) {
        const challenge = await response.json();
        dispatch(actionGetChallenges(challenge))
    }
}

export const getChallengeById = (challengeId) => async dispatch => {
    const response = await fetch(`/api/challenges/${challengeId}`)

    if (response.ok) {
        const challenge = await response.json();

        dispatch(actionGetChallengeById(challenge))
    }
}

export const createChallenge = (challenge) => async dispatch => {
    const response = await fetch(`/api/challenges`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(challenge)
    });


    if (response.ok) {
        let newChallenge = await response.json();
        dispatch(actionCreateChallenge(newChallenge))
        return newChallenge;
    }
}

export const updateChallenge = (challenge) => async dispatch => {
    const response = await fetch(`/api/challenges/${challenge.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(challenge)
    })

    if (response.ok) {
        const updatedChallenge = await response.json();
        dispatch(actionUpdateChallenge(updatedChallenge));
        return updatedChallenge;
    }
}

export const deleteChallenge = (challengeId) => async dispatch => {
    const response = await fetch(`/api/challenges/${challengeId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(actionDeleteChallenge(challengeId));
    }
}
// __________CREATE_INITIAL_STATE____________
const initialState = {};

// ___________CHALLENGES_REDUCER______________
const challengeReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_CHALLENGES:
            let challengesState = {}
            action.challenges.forEach(challenge => {
                challengesState[challenge.id] = challenge;
            })
            return {
                ...state,
                ...challengesState
            }
        case GET_CHALLENGES:
            let userChallengesState = {}
            action.challenges.startedChallenges.forEach(challenge => {
                userChallengesState[challenge.id] = challenge
            })
            return {
                ...state,
                ...userChallengesState
            }
        case GET_CHALLENGE_BY_ID:
            return {
                ...state,
                [action.challenge.id]: action.challenge

            }
        case CREATE_CHALLENGE:
            return {
                ...state,
                [action.challenge.id]: action.challenge

            }
        case UPDATE_CHALLENGE:
            return {
                ...state,
                [action.challenge.id]: { ...state[action.challenge.id], ...action.challenge }

            }
        case DELETE_CHALLENGE:
            newState = { ...state };
            delete newState[action.challengeId];
            return newState
        default:
            return state;
    }
}

export default challengeReducer;
