const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on( 'connection', (socket) => {
  console.log('New user connected');
  
  socket.emit('newMessage', 
    generateMessage("Admin", "Welcome to the chat room!"));

  socket.broadcast.emit('newMessage', 
    generateMessage("Admin", "New user joined the chat"));

  socket.on('createMessage', (message, callback) => {
    console.log('New message from', message.from);
    message.createdAt = (+ new Date());
    io.emit('newMessage', 
      generateMessage(message.from, message.text));
    if (callback) { callback('OK from server'); }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('createLocationMessage', (position) => {
    io.emit('newLocationMessage',
      generateLocationMessage("user1", position.lat, position.lng));
  });
});

server.listen(port, () => {
  console.log('Node server listening on port', port);
});
