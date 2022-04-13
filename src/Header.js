import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import IconButton from '@mui/material/IconButton';
import Navbar from './components/navbar';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className="header">
			<Navbar />

			{/* House Icon */}
			<Link to="/">
				<IconButton>
					<HouseRoundedIcon fontSize="large" />
				</IconButton>
			</Link>

			{/* Message Icon*/}
			<IconButton>
				<AccountCircleIcon className="header-icon" fontSize="large" />
			</IconButton>
		</div>
	);
}

export default Header;
