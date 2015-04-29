// this is the server that is using node and Socket.io

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

http.listen(3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});

io.on('connection', function (socket) {
  console.log('Someone has connected.THIS IS GREAT');
  socket.emit("message", { user: "turingbot", text: "Hello" });

  socket.on("message", function(channel, message) {
    debugger;
    socket.emit("message", message);
    socket.broadcast.emit("message", "This is the broadcasted message")
  })

  // every second we emit a message
  var interval = setInterval(function() {
    socket.emit("repeated message", {
      user: "turingbot",
      text: "This is going to get annoying real fast."
    })
  },1000);

  socket.on("disconnect", function() {
    clearInterval(interval);
  })
});
