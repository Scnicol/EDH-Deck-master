import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadAllChallenges } from '../../store/challenges';
import { getUsers } from '../../store/users';
import DatePicker from "react-datepicker";



function ChallengeForm({ challengedId, submitAction, formSubmit, challenge, formTitle }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState(challenge.name);
    const [description, setDescription] = useState(challenge.description)
    const [challengeDate, setChallengeDate] = useState(challenge.challengeDate)

    // ________VAILDATION_ERRORS_STATE____________
    const [errors, setErrors] = useState({ name: [], description: [], date: [] })

    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateChallengeDate = (e) => setChallengeDate(e.target.value);

    const user = useSelector(state => state.session.user)
    if (!user) history.push('/')
    const challengedUser = useSelector(state => state.users[challengedId])

    useEffect(() => {
        dispatch(loadAllChallenges())
        dispatch(getUsers())
    }, [dispatch])

    if (!challengedUser) {
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

        // ____VALIDATION_ERRORS________
        const validationErrors = { name: [], description: [], date: [] };
        let currDate = new Date().toJSON().slice(0, 10);
        console.log(currDate, challengeDate, "currDate vs ChallengeDate")
        if (name.length === 0) validationErrors.name.push('Name field is required');
        if (description.length < 15) validationErrors.description.push('Description needs 15 or more characters');
        if (challengeDate < currDate) validationErrors.date.push('Cannot set challenge in the past')
        setErrors(validationErrors)

        if (validationErrors.name.length > 0 || validationErrors.description.length > 0 || validationErrors.date.length > 0) {
            return;
        }


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
                <ul className='errors'>
                    {errors.name.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <p>Describe your challenge</p>
                <textarea
                    placeholder="Description"
                    rows="5"
                    cols="40"
                    value={description}
                    onChange={updateDescription}
                />
                <ul className='errors'>
                    {errors.description.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <p>Please choose a date for your challenge</p>
                <input
                    type="date"
                    placeholder='YYYY-MM-DD'
                    onChange={updateChallengeDate}
                />
                <ul className='errors'>
                    {errors.date.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <h2>
                    <button type="submit" disabled={name.length == 0 || description.length == 0 || challengeDate.length == 0}>{formSubmit} Challenge</button>
                </h2>
            </form>
        </div>
    )
}

export default ChallengeForm;
