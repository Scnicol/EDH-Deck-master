import { useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getChallengeById } from '../../store/challenges';
import OpenModalButton from '../OpenModalButton';
import ChallengeDeleteModal from './ChallengeDeleteModal';
import './ChallengeDetails.css'


const ChallengeDetails = () => {
    const { challengeId } = useParams();
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
        <div className='challenge-details-container'>
            <div>
                <h1 className='challenge-details-name'>{challenge.name}</h1>
                <h2 className='challenge-details-description-title'>Description: </h2>
                <h3 className='challenge-detail-description'>{challenge.description}</h3>
                <h3 className='challenge-detail-description'>Challenge Date: {challenge.challengeDate.slice(0, 10)}</h3>
            </div>
            {user?.id == challenge.challengerId &&
                <div>
                    <NavLink className='create-update-buttons' to={`current/${challenge.challengedId}/edit/${challengeId}`}>
                        Edit Challenge
                    </NavLink>
                    <OpenModalButton
                        id='secondary delete-button'
                        buttonText="Delete"
                        modalComponent={<ChallengeDeleteModal  challengeId={challengeId} />}
                    />
                </div>}
        </div>
    )
}

export default ChallengeDetails;
