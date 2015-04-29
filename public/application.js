// this is the client

var socket = io();

var $messages = $('.messages');

socket.on("connect", function() {
  socket.send('message', {
    username: "Steve",
    text: "I did the thing"
  });
});

function addMessage(message) {
  $(`<p class="message">${message.username}: ${message.text}</p>`).appendTo(".messages")
}

socket.on("message", addMessage)

var $button = $(':button[name=button]');

$button.click(function() {
  var $username = $(":input[name=username]").val();
  var $message = $(":input[name=message]").val();
  socket.send("message", {
    username: $username,
    text: $message
  });
})

socket.on("message", function(message) {
  console.log("I got a message:", message);
})
//
// socket.on("repeated message", function(message) {
//   $(`<p class='message'> + ${message.user}: ${message.text}</p>`).appendTo($messages);
// });

http.listen(process.env.PORT, function() {
  console.log("Your server is up and running on Port 3000. Go you!")
})
