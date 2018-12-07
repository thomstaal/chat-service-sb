var express = require('express')();
var http = require('http').Server(express);
var io = require('socket.io')(http);
const aws = require('aws-sdk');
var PORT = process.env.PORT || 5000;

express().listen(PORT, () => console.log(`Listening on ${ PORT }`));

express.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

  socket.on('disconnect', function () {
    socket.emit('test', 'Disconnected...');
  });

  socket.on('message', function (message) {
    io.emit('message', message);
  });

  socket.on('notice', function(message){
    io.emit('notice', message);
  });

});


// http.listen(5000, function () {
//   console.log('listening on *:3000');
// });