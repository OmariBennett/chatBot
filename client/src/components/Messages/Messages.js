import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import Message from './Message/Message.js';
import './Messages.css';

const Messages = ({ messages, name }) => (
	<ScrollableFeed className='messages'>
		{messages.map((message, idx) => (
			<div key={idx}>
				<Message message={message} name={name} />
			</div>
		))}
	</ScrollableFeed>
);

export default Messages;
