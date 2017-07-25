let socket = io();
socket.on('connect', () => {
  console.log('Yay! Connected to server!');
});

socket.on('disconnect', () => {
  console.log('Disconected from server!');
});

socket.on('newMessage', (message) => {
  console.log('New message arrived: ', message);

  let time = moment(message.createdAt).format('MMM Do, k:mm');
  let template = $('#template-message').html();
  let html = Mustache.render(template, {
    text: message.text,
    createdAt: time,
    from: message.from
  });
  $('#list-messages').append(html);
  fnScrollToBottom();
});

socket.on('newLocationMessage', (message) => {
  let time = moment(message.createdAt).format('MMM Do, k:mm');
  let template = $('#template-location-message').html();
  let html = Mustache.render(template, {
    text: message.uri,
    createdAt: time,
    from: message.from
  });
  $('#list-messages').append(html);
  fnScrollToBottom();  
});

$(document).on('click', '#form-message > button', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: "User1",
    text: $('#form-message > input').val()
  });
  $('#form-message > input').val("");
});

let locationButton = $('#btn-location');
$(locationButton).on('click', (e) => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser!');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition( (position) => {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  }, (err) => {
    locationButton.removeAttr('disabled').text('Send location');    
    alert('Could not fetch the location!');
  });
});

//Error handling
socket.io.on('connect_error', (err) => {
  console.log('Error connecting to server');
});

//Functions
let fnScrollToBottom = () => {
  //Selectors
  let messages = $('#list-messages');
  let newMessage = messages.children('li:last-child');
  //Heights
  let clientHeigth = messages.prop('clientHeigth');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeigth + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};