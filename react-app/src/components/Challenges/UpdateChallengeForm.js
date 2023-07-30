import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getChallengeById, updateChallenge } from '../../store/challenges';
import ChallengeForm from './ChallengeForm';

function UpdateChallengeForm() {
    const { challengeId, challengedId } = useParams();
    const dispatch = useDispatch();

    const challenge = useSelector(state => state.challenges[challengeId])

    useEffect(() => {
        dispatch(getChallengeById(challengeId))
    }, [dispatch])

    if (!challenge) {
        return (
            <h1>Loading...</h1>
        )
    }

    function submitAction(challenge) {
        const newChallenge = {...challenge, id: challengeId};
        return updateChallenge(newChallenge);
    }

    return (
        <ChallengeForm challenge={challenge} challengedId={challengedId}
         formTitle="Edit" formSubmit="Edit" submitAction={submitAction}/>
    )
}

export default UpdateChallengeForm;
