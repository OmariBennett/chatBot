import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar.js';
import Input from '../Input/Input.js';
import Messages from '../Messages/Messages.js';

import './Chat.css';

let socket;
const ENDPOINT = 'http://localhost:5000/';

const Chat = ({ location }) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);

		socket = io(ENDPOINT);
		setName(name);
		setRoom(room);

		socket.emit('join', { name, room }, () => {});

		return () => {
			socket.emit('disconnect');
			// socket.off();
			socket.disconnect();
		};
	}, [ENDPOINT, location.search]);

	// Handle messages
	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((messages) => [...messages, message]);
		});
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};

	console.log({ message, messages });
	return (
		<div className='outerContainer'>
			<div className='container'>
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				{/* <Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/> */}
				<input
					className='input'
					type='text'
					placeholder='Type  a message...'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
				/>
			</div>
		</div>
	);
};

export default Chat;
