// server-side (server.js)

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', (message) => {
       resultObj = JSON.parse(message)
      message = (resultObj['message']);
      emotion = (resultObj['emotion']);
      console.log("Message:"+message+":"+emotion)
      if((emotion == "joy")||(emotion == "neutral"))
        {
            message = message //We are allowing
            
        }
        else
        {
            message = "The message has been hidden";
        }
        io.emit('newMessage', message);
    });
});

http.listen(3000, () => {
    console.log('Server listening on port 3000');
});