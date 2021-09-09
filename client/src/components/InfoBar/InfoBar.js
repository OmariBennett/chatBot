import React from 'react';
import closeIcon from '../../icons/CloseIcon/closeIcon.png';
import onlineIcon from '../../icons/OnlineIcon/onlineIcon.png';
import './InfoBar.css';

const InfoBar = ({ room }) => (
	<div className='infoBar'>
		<div className='leftInnerContainer'>
			<img className='onlineIcon' src={onlineIcon} alt='online icon' />
			<h3>{room}</h3>
		</div>
		<div className='rightInnerContainer'>
			<a href='/'>
				<img className='closeIcon' src={closeIcon} alt='close icon' />
			</a>
		</div>
	</div>
);

export default InfoBar;