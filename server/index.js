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

io.on('connect', (socket) => {
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });

		if (error) return callback(error);

		socket.join(user.room);

		socket.emit('message', {
			user: 'Admin',
			text: `${user.name}, Welcome to the ${user.room} chat!`,
		});
		socket.broadcast
			.to(user.room)
			.emit('message', { user: 'Admin', text: `${user.name} has joined!` });

		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);
		io.to(user.room).emit('message', { user: user.name, text: message });
		callback();
	});

	socket.on('disconnect', () => {
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('message', {
				user: 'Admin',
				text: `${user.name} has left.`,
			});
		}
	});
});

app.use(router); // calling the router as a middleware

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
