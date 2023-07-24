import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, Route, useParams } from 'react-router-dom';
import { getDecks } from '../../store/decks';

const HomePage = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const decks = Object.values(useSelector(state => state.decks))

    useEffect(() => {
        dispatch(getDecks());
    }, [dispatch]);

    return (
        <main>
            <div>
                HOMEPAGE SUCKERS!!
            </div>
        </main>
    )
}

export default HomePage;
