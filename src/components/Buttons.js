import React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import './Buttons.css';

function Buttons() {
	return (
		<div className="Buttons">
			<IconButton className="buttons_close">
				<CloseIcon fontSize="large" />
			</IconButton>
			<IconButton className="buttons_replay">
				<ReplayIcon fontSize="large" />
			</IconButton>
			<Link to="/chat">
				<IconButton className="buttons_message">
					<MessageIcon fontSize="large" />
				</IconButton>
			</Link>
			<IconButton className="buttons_favorite">
				<FavoriteIcon fontSize="large" />
			</IconButton>
		</div>
	);
}

export default Buttons;
