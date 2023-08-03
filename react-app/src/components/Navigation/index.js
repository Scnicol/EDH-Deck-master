import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import FolderButtonModal from './FolderButtonModal';
import OpenModalButton from '../OpenModalButton';


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<main className='navContainer'>
			<div >
				<NavLink  className="logo" exact to="/" >EDH DECK MASTER</NavLink>
				<img scr={'https://scalebranding.com/wp-content/uploads/2021/02/21.-Card-game-logo.jpg'} />
			</div>
			<div className='inventory-profile-container'>
				{sessionUser &&
					<div>
						<OpenModalButton
							buttonText="Inventory"
							modalComponent={<FolderButtonModal />}
						/>
					</div>}
				{isLoaded && (

					<ProfileButton user={sessionUser} />

				)}
			</div>
		</main>
	);
}

export default Navigation;
