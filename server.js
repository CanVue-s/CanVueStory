const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

//required 2 dependencies to enable JWT
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

const PORT = 3000;
require('./server/mongoose/mongoose.js');

app.use(cors());

// parse incoming request body information so that it can be used
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set middleware to block access and require auth token, except following link
//app.use(expressJWT({secret: 'forbiddenCookieJar'}).unless({ path: ['/', '/create', '/getCanvas','/check'] }));

app.use(express.static(__dirname + '/client'));

// static files to serve the current ongoing games and game room once you click
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/vuejs/index.html');
  // res.sendFile(__dirname + '/client/home/home.html');
})

app.get('/rooms/:room', (req, res) => {
  res.sendFile(__dirname + '/client/host/host.html');
});

app.get('/transcript', (req, res) => {
  res.sendFile(__dirname + '/client/Transcript/transcript.html');
});

app.use(express.static('client'));
app.use(express.static('client/Transcript'));
app.use(express.static('client/host'));
app.use(express.static(path.join(__dirname, 'node_modules')));
// requires server routes => located in server/routes
require('./server/routes/routes.js')(app);

// requires sockets for connection => located in server/sockets
require('./server/sockets/sockets.js')(io);

http.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
