import { useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getChallengeById } from '../../store/challenges';
import OpenModalButton from '../OpenModalButton';
import ChallengeDeleteModal from './ChallengeDeleteModal';

const ChallengeDetails = () => {
    const {challengeId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const challenge = useSelector(state => state.challenges[challengeId])
    const user = useSelector(state => state.session.user)

    if (!user) history.push('/')

    useEffect(() => {
        dispatch(getChallengeById(challengeId))
    }, [dispatch])

    if (!challenge) return (
        <h1>Challenge Doesn't Exist</h1>
    )

    return (
        <div>
            <div>
                <h1>{challenge.name}</h1>
                <h2>{challenge.description}</h2>
            </div>
            <NavLink to={`current/${challenge.challengedId}/edit/${challengeId}`}>
                Edit Challenge
            </NavLink>
            <OpenModalButton
                buttonText="Delete"
                modalComponent={<ChallengeDeleteModal challengeId={challengeId}/>}
            />
        </div>
    )
}

export default ChallengeDetails;
