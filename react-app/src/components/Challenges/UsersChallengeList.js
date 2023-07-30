import { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersDecks } from '../../store/decks';
import { loadAllChallenges } from '../../store/challenges';

function UsersChallengeList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const challenges = useSelector(state => state.challenges)
    const user = useSelector(state => state.session.user)

    if (!user) history.push('/')

    const usersChallenges = Object.values(challenges).filter(challenge => challenge.challengerId == user?.id)
    const usersChallenged = Object.values(challenges).filter(challenge => challenge.challengedId == user?.id)
    useEffect(() => {
        dispatch(getUsersDecks());
        dispatch(loadAllChallenges())
    }, [dispatch])

    if (!challenges) {
        return (
            <h1>No challenges</h1>
        )
    }

    return (
        <div>
            <div>
                User's Challenges
            </div>
            <div>
                Created Challenges:
            </div>
            <div>
                {usersChallenges.map((challenge) => (
                    <div key={challenge.id}>
                        <NavLink to={`/challenges/${challenge.id}`}>
                            {challenge.name}

                        </NavLink>
                        <div>
                            {challenge.description}
                        </div>
                    </div>
                ))}
            </div>
            <div>
                Recieved Challenges:
            </div>
            <div>
                {usersChallenged.map((challenge) => (
                    <div key={challenge.id}>
                        <NavLink to={`/challenges/${challenge.id}`}>
                            {challenge.name}

                        </NavLink>
                        <div>
                            {challenge.description}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default UsersChallengeList;
