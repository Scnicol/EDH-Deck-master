import { useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersDecks } from '../../store/decks';
import { loadAllChallenges } from '../../store/challenges';
import './UsersChallenges.css'

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
        <div className='users-challenges-main-container'>
            <div className='users-challenges-title'>
                Your Challenges
            </div>

            <div className='created-challenges-title'>
                Created Challenges:
            </div>
            <div>
                {usersChallenges.map((challenge) => (
                    <div className='created-challenges-container' key={challenge.id}>
                        <NavLink className="create-update-buttons" to={`/challenges/${challenge.id}`}>
                            {challenge.name}

                        </NavLink>
                        <div className='created-challenges-details'>
                            <div>
                                Challenge Date: {challenge.challengeDate.slice(0, 10)}
                            </div>
                            <div>
                                Description: {challenge.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className='recieved-challenges-title'>
                Recieved Challenges:
            </div>
            <div>
                {usersChallenged.map((challenge) => (
                    <div className='recieved-challenges-container' key={challenge.id}>
                        <NavLink className="create-update-buttons" to={`/challenges/${challenge.id}`}>
                            {challenge.name}

                        </NavLink>
                        <div className='created-challenges-details'>
                            <div>
                                Challenge Date: {challenge.challengeDate.slice(0, 10)}
                            </div>
                            <div>
                                Description: {challenge.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div >
    )
}

export default UsersChallengeList;
