const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

function onConnection(socket) {
    //Waits for drawing emit from main.js THEN broadcasts & emits the data to socket in main.js (line 32)
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

    //Waits for cleared emit from canvas.html THEN broadcasts & emits data to socket in canvas.html (line 35)
    socket.on('cleared', (data) => socket.broadcast.emit('clearCanvas', data));
}

//On initial server connection, socket passed to onConnection function.
io.on('connection', onConnection);



http.listen(port, () => console.log('listening on port ' + port));