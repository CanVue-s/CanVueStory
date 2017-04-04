const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const PORT = 3000;
require('./server/mongoose/mongoose.js');

// parse incoming request body information so that it can be used
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

// static files to serve the current ongoing games and game room once you click
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/vuejs/index.html');  
  // res.sendFile(__dirname + '/client/home/home.html');
})

app.get('/rooms/:room', (req, res) => {
  res.sendFile(__dirname + '/client/host/host.html');
});

// requires server routes => located in server/routes
require('./server/routes/routes.js')(app);

// requires sockets for connection => located in server/sockets
require('./server/sockets/sockets.js')(io);

http.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
