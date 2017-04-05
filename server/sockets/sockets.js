const userController = require('./../controllers/userController.js');

module.exports = (io) => {

  // On initial server connection, socket passed to onConnection function.
  io.on('connection', onConnection);

  function onConnection(socket) {
    console.log('socket connected', socket.id);

    // var clients = {
    //   room1: 0,
    //   room2: 0,
    //   room3: 0
    // }

    socket.on('join', (room) => {
      socket.join(room);
      socket.room = room;
      
      console.log('joined room', room);
    })

    // Listens to disconnect event
    socket.on('disconnect', () => {
      console.log(`socket ${socket.id} has disconnected`);
    })

    //Waits for drawing emit from main.js THEN broadcasts & emits the data to socket in main.js (line 32)
    socket.on('drawing', (data) => {
      io.sockets.in(socket.room).emit('drawing', data);
    });

    socket.on('chatMessage', (message) => {
      io.sockets.in(socket.room).emit('chatMessage', (message));
    })

    //Waits for cleared emit from canvas.html THEN broadcasts & emits data to socket in canvas.html (line 35)
    socket.on('cleared', (data) => socket.broadcast.emit('clearCanvas', data));
  }
}