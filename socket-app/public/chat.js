//make connection -front end
var socket = io.connect('http://localhost:5000');

//query DOM
var message = document.getElementById('message');
    handle = document.getElementById('handle');
    btn = document.getElementById('send');
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');

//emit events
//sending to the server
btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('keypress',function(){
  socket.emit('typing', handle.value)
});

//listen for events
socket.on('chat', function(data){
  output.innerHTML +='<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + 'is typing a message...</em><p>';
});
