let socket = io();
socket.on('connect', () => {
  console.log('Yay! Connected to server!');
});

socket.on('disconnect', () => {
  console.log('Disconected from server!');
});

socket.on('newMessage', (message) => {
  console.log('New message arrived:', message);
  let li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#message-list').append(li);
});

$(document).on('click', '#message-form > button', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: "User1",
    text: $('#message-form > input').val()
  });
  $('#message-form > input').val("");
});