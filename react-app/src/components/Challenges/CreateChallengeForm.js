import { useHistory, useParams } from 'react-router-dom';
import { createChallenge } from '../../store/challenges';
import ChallengeForm from './ChallengeForm';


function CreateChallengeForm() {
    const {challengedId} = useParams();
    const challenge = {
        name: '',
        description: '',
        challengeDate: '',
    }

    function submitAction(challenge) {
        const newChallenge = {...challenge};
        return createChallenge(newChallenge);
    }

    return (
        <ChallengeForm challengedId={challengedId} challenge={challenge}
        formTitle="Create" formSubmit="Create" submitAction={submitAction}/>
    )
}

export default CreateChallengeForm;
