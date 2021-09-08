const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router.js');
const cors = require('cors');
const { addUser, getUser, removeUser, getUserInRoom } = require('./user.js');

const PORT = 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: '*',

		methods: ['GET', 'POST'],

		credentials: true,
	},
});

io.on('connection', (socket) => {
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });

		if (error) return callback(error);

		socket.emit('message', {
			user: 'admin',
			text: `${user.name}, Welcome to the ${user.room} chat!`,
		});
		socket.broadcast
			.to(user.room)
			.emit('message', { user: 'admin', text: `${user.name} has joined!` });

		socket.join(user.room);
		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);
		io.to(user.room).emit('message', { user: user.name, text: message });
		callback();
	});

	socket.on('disconnect', () => {
		console.log('User has left the chat!');
	});
});

app.use(router); // calling the router as a middleware

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
