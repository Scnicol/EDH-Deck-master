import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import FolderButtonModal from './FolderButtonModal';
import OpenModalButton from '../OpenModalButton';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<main>
			<div>
				<NavLink exact to="/">Home</NavLink>
			</div>
			<div>
			<OpenModalButton
              buttonText="Inventory"
              modalComponent={<FolderButtonModal />}
            />
			</div>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</main>
	);
}

export default Navigation;
