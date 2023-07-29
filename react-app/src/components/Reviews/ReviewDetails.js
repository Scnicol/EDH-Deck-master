import { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const ReviewDetails = () => {
    const {reviewId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const review = useSelector(state => state.reviews[reviewId]);
    const user = useSelector(state => state.session.user);

    if (!user) history.push('/');
}
