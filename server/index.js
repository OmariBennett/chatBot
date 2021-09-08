const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router.js');
const { disconnect } = require('process');

const PORT = 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
	console.log('We have a new connection.');

	socket.on('disconnect', () => {
		console.log('User has left the chat!');
	});
});

app.use(router); // calling the router as a middleware

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
