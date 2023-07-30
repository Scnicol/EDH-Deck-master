import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllUserChallenges } from '../../store/challenges';
import { loadAllChallenges } from '../../store/challenges';
import { getUsers } from '../../store/users';

function ChallengeForm({challengedId, submitAction, formSubmit, challenge, formTitle }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState(challenge.name);
    const [description, setDescription] = useState(challenge.description)
    const [challengeDate, setChallengeDate] = useState(challenge.challengeDate)

    // ________VAILDATION_ERRORS_STATE____________
    const [errors, setErrors] = useState({ name: [], description: []})

    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateChallengeDate = (e) => setChallengeDate(e.target.value);

    const user = useSelector(state => state.session.user)
    const challengedUser = useSelector(state => state.users[challengedId])

    useEffect(() => {
        dispatch(loadAllChallenges())
        dispatch(getUsers())
    },[dispatch])

    if (!user || !challengedUser) {
        return (
            <h1>Loading...</h1>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            description,
            challengeDate,
            challengedId
        }

        console.log(payload, "payload------")

        // ____VALIDATION_ERRORS________
        const validationErrors = { name: [], description: []};

        let challenge;
        challenge = await dispatch(submitAction(payload));

        if (challenge) {
            history.push(`/challenges/current`);
        }
    };

    return (
        <div>
            <h1>{formTitle} new Challenge against {challengedUser.username}</h1>
            <form onSubmit={handleSubmit}>
                <p>Name your challenge</p>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={updateName}
                />
                <p>Describe your challenge</p>
                <textarea
                    placeholder="Description"
                    rows="5"
                    cols="40"
                    value={description}
                    onChange={updateDescription}
                />
                <p>Please choose a date for your challenge</p>
                <input
                    type="date"
                    placeholder='YYYY-MM-DD'
                    onChange={updateChallengeDate}
                />
                <h2>
                    <button type="submit">{formSubmit} Challenge</button>
                </h2>
            </form>
        </div>
    )
}

export default ChallengeForm;
