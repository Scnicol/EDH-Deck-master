import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function UpdateChallengeForm() {
    const { challengeId, challengedId } = useParams();
    const dispatch = useDispatch();

    const challenge = useSelector(state => state.challenges[challengeId])

}

export default UpdateChallengeForm;
