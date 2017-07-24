const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on( 'connection', (socket) => {
  console.log('New user connected');
  
  socket.emit('newMessage', {
    from:"Admin",
    text:"Welcome to the chat room!"
  });

  socket.broadcast.emit('newMessage', {
    from:"Admin",
    text:"New user joined the chat"
  });

  socket.on('createMessage', (message) => {
    console.log('New message from', message.from);
    message.createdAt = (+ new Date());
    socket.broadcast.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log('Node server listening on port', port);
});
