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
		<main className='navContainer'>
			<div className="navLinkLogo">
				<NavLink exact to="/" >Home</NavLink>
				<img className='logoimg' scr={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fpng-thskj&psig=AOvVaw36GmQYM37FwqhM9eV7rcLU&ust=1690911207814000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCND-_LG9uYADFQAAAAAdAAAAABAD'}/>
			</div>
			{sessionUser &&
			<div>
			<OpenModalButton
              buttonText="Inventory"
              modalComponent={<FolderButtonModal />}
            />
			</div>}
			{isLoaded && (
				<div className='profileButton'>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</main>
	);
}

export default Navigation;
