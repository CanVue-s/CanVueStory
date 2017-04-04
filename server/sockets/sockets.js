module.exports = (io) => {

  let counter = 0;
  let roomA = 'roomA';
  let roomB = 'roomB';
  // On initial server connection, socket passed to onConnection function.
  io.on('connection', onConnection);

  function onConnection(socket) {
    console.log('socket connected', socket.id);

    // this checks to see how many users are in roomA and moves you to room B if there are more than 3
    if (counter >= 3) {
      socket.join(roomB);
      // this emits to all users that you just connected to roomB
      socket.room = roomB;
      io.sockets.in(roomB).emit('connectToRoom', `User joined ${roomA}`);
      counter += 1;
      console.log(counter);
    } else {
      socket.join(roomA);
      // this emits to all users that you just connected to roomA
      socket.room = roomA;
      io.sockets.in(roomA).emit('connectToRoom', `User joined ${roomB}`);
      counter += 1;
      console.log(counter);
    }

    // Listens to disconnect event
    socket.on('disconnect', () => {
      console.log(`socket ${socket.id} has disconnected`);
    })

    //Waits for drawing emit from main.js THEN broadcasts & emits the data to socket in main.js (line 32)
    socket.on('drawing', (data) => {
      io.sockets.in(socket.room).emit('drawing', data);
      // io.in(roomA).emit('drawing', data);
      //socket.broadcast.emit('drawing', data)
    });

    //Waits for cleared emit from canvas.html THEN broadcasts & emits data to socket in canvas.html (line 35)
    socket.on('cleared', (data) => socket.broadcast.emit('clearCanvas', data));
  }
}