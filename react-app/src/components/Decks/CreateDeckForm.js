import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardSearch from '../CardSearch/CardSearch';
import DeckForm from './DeckForm';

function CreateDeckForm() {

    return (
        <DeckForm/>
    )
}

export default CreateDeckForm;
