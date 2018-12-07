var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

  socket.on('disconnect', function () {
    socket.emit('test', 'Disconnected...');
  })

  socket.on('message', function (message) {
    io.emit('message', message);
  })

  socket.on('notice', function(message){
    io.emit('notice', message);
  })

});


http.listen(3000, function () {
  console.log('listening on *:3000')
});