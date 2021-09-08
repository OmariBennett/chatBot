const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router.js');

const PORT = 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router); // calling the router as a middleware

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
