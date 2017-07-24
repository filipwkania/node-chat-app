let socket = io();
socket.on('connect', () => {
  console.log('Yay! Connected to server!');
});

socket.on('disconnect', () => {
  console.log('Disconected from server!');
});

socket.on('newMessage', (message) => {
  console.log('New message arrived: ', message);
  let li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#message-list').append(li);
});

socket.on('newLocationMessage', (message) => {
  let li = $('<li></li>');
  let a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.uri);
  li.append(a);
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

$(document).on('click', '#btn-location', (e) => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser!');
  }

  navigator.geolocation.getCurrentPosition( (position) => {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  }, (err) => {
    alert('Could not fetch the location!');
  });
});

//Error handling
$('#socket').on('error', () => {
  console.log('Could not connect to server.');
});

socket.io.on('connect_error', (err) => {
  console.log('Error connecting to server');
});