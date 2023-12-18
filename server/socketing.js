// socket.js
const socketIO = require('socket.io');
const cors = require('cors'); //For accessing api within own url for localhost access
const jwt = require('jsonwebtoken');
const { getProfileForUsername, getMessagesAndProfileImage, insertMessage } = require('./chatData');
const { getAllUsers } = require('./users');

function configureSockets(httpServer) {
  const io = socketIO(httpServer, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
    }
  });


  const authSocketMiddleware = (socket, next) => {

    const AuthToken = socket.handshake.auth.authToken;
    jwt.verify(AuthToken, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) return next(new Error("NOT AUTHORIZED"));
      // console.log(user);
      socket.user = user;
      next();
    })

  };

  const usernameToSocketId = {};
  const socketIdToUsername = {};


  io.use((socket, next) => {
    authSocketMiddleware(socket, next);
  });



  io.on('connection', (socket) => {
    // console.log('user connected');
    // console.log(socket.handshake.auth.authToken);
    console.log(socket.user.username, ' connected.');

    usernameToSocketId[socket.user.username] = socket.id;
    socketIdToUsername[socket.id] = socket.user.username;

    socket.on('initiate', async () => {
      // Handle the 'initiate' event and send necessary data back to the sender
      const responseData = {
        profileImage: await getProfileForUsername(socket.user.username),
        allUsers: await getAllUsers(),
      };
      socket.emit('initiate-response', responseData);
    });


    socket.on('getcontent', async () => {
      // Handle the 'initiate' event and send necessary data back to the sender
      const text = await getMessagesAndProfileImage(socket.user.username);
      const texts = {
        texts: text,
      }
      console.log(socket.user.username, ' content sent.')
      socket.emit('getcontent-response', texts);
    });

    socket.on('message-input', async (data) => {
      if (data.messageType === 'text')
        await insertMessage(data);
      else {
        console.log(data);
        return;
      }


      if (usernameToSocketId[data.sender] != null) {
        io.to(usernameToSocketId[data.sender]).emit('message-update');
      }

      if (usernameToSocketId[data.receiver] != null) {
        io.to(usernameToSocketId[data.receiver]).emit('message-update');
      }


    });



    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(socket.user.username, ' disconnected');
      const disconnectedUsername = socketIdToUsername[socket.id];
      usernameToSocketId[disconnectedUsername] = null;
      socketIdToUsername[socket.id] = null;
    });
  });

}

module.exports = configureSockets;
