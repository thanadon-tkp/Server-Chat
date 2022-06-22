const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "https://web-chat.thanadon-tkp.repl.co"
    }
  });

io.on('connection', (socket) => {

    console.log('User ID:' + socket.id);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
        console.log(msg.name + ' say:' + msg.message);
      });

  });

server.listen(4000, () => {
  console.log('listening on *:4000');
});