// app.js
var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(5000, function(){
  console.log("listening on port 5000");
});

//Using static files
app.use(express.static('public'));

//make a socket
var io=socket(server);

io.on('connection', function(socket){
  console.log('made a socket connection', socket.id)

  socket.on('chat',function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  })
});
/*var theMessage = "the secret word is ladybird";

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    client.on('join', function(data) {
        console.log(data);
        client.emit('message',theMessage);
    });
});

server.listen(5000);
*/
