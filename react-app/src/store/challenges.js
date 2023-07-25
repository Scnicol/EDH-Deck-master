// ________ACTION_TYPES______________
const LOAD_CHALLENGES = 'challenges/LOAD_CHALLENGES'
const GET_CHALLENGES = 'challenges/GET_CHALLENGES'
const GET_CHALLENGE_BY_ID = 'challenges/GET_CHALLENGE_BY_ID'

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

//  _________THUNK_ACTIONS_____________
export const loadAllChallenges = () => async dispatch => {
    const response = await fetch(`/api/challenges`);

    if (response.ok) {
        const challenges = await response.json();
        dispatch(actionLoadChallenges(challenges))
    }
}

export const getAllUserChallenges = () => async dispatch => {
    const response = await fetch(`api/challenges/current`)

    if (response.ok) {
        const challenges = await response.json();
        dispatch(actionGetChallenges(challenges))
    }
}

export const getChallengeById = (challengeId) => async dispatch => {
    const response = await fetch(`/api/challenges/${challengeId}`)
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
                challenges: challengesState
            }
        case GET_CHALLENGES:
            let userChallengesState = {}
            action.challenges.forEach(challenge => {
                userChallengesState[challenge.id] = challenge
            })
            return {
                ...state,
                usersChallenges: userChallengesState
            }
        default:
            return state;
    }
}

export default challengeReducer;
