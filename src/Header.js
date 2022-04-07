import React from 'react';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import IconButton from '@mui/material/IconButton';
import './Header.css';
import Navbar from './components/navbar';

function Header() {
	return (
		<div className="header">
			<Navbar />

			{/* House Icon */}
			<IconButton>
				<HouseRoundedIcon fontSize="large" />
			</IconButton>

			{/* Message Icon*/}
			<IconButton>
				<MessageRoundedIcon className="header-icon" fontSize="large" />
			</IconButton>
		</div>
	);
}

export default Header;
