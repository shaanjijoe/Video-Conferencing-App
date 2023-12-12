// socketing.js
const socketIo = require('socket.io');

function setupSocket(server) {
  const io = socketIo(server);

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle events from the client
    socket.on('exampleEvent', (data) => {
      console.log('Received data from client:', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
}

module.exports = setupSocket;
