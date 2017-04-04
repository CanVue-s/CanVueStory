module.exports = (io) => {

  let counter = 0;
  let roomA = 'roomA';
  let roomB = 'roomB';
  // On initial server connection, socket passed to onConnection function.
  io.on('connection', onConnection);

  function onConnection(socket) {
    console.log('socket connected', socket.id);

    if (counter >= 5) {
      socket.join("roomB");
      counter += 1;
      console.log(counter);
    } else {
      socket.join("roomA");
      counter += 1;
      console.log(counter);
    }

    io.sockets.in("roomA").emit('connectToRoom', "You are in roomA");

    // Listens to disconnect event
    socket.on('disconnect', () => {
      console.log(`socket ${socket.id} has disconnected`);
    })

    // socket.on('roomA', (roomA) => {
    //   console.log(`connected to ${roomA}`);
    //   socket.join(roomA);
    // })

    //Waits for drawing emit from main.js THEN broadcasts & emits the data to socket in main.js (line 32)
    socket.on('drawing', (data) => {
      io.in(roomA).emit('drawing', data);
      //socket.broadcast.emit('drawing', data)
    });

    //Waits for cleared emit from canvas.html THEN broadcasts & emits data to socket in canvas.html (line 35)
    socket.on('cleared', (data) => socket.broadcast.emit('clearCanvas', data));
  }
}