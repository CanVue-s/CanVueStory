const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const vueTestController = require('./Server/vueTestController');

const PORT = 8080;

mongoose.connect('mongodb://test:test@ds149800.mlab.com:49800/vue-test');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static('./build'));

app.post('/', vueTestController.createUser);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/Transcript/index.html'));
})

app.get('/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/Transcript/main.js'));
})

app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/Transcript/styles.css'));
})

app.get('/node_modules/vue-resource/dist/vue-resource.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/node_modules/vue-resource/dist/vue-resource.js'));
})

app.get('/node_modules/vue/dist/vue.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/node_modules/vue/dist/vue.js'));
})

// app.get('/messages', vueTestController.getMessages);

app.get('/messages', (req, res) => {
  vueTestController.getAllUsers((err, users) => {
    if (err) throw err;
    res.json(users);
    // res.render('./../client/secret', { users: users });
  });
})

app.get('/rooms/', (req, res) => {
  res.sendFile(__dirname + '/client/host/host.html');
})

app.get('/host/host.css', (req, res) => {
  res.sendFile(__dirname + '/client/host/host.css');
})

app.get('/host/host.js', (req, res) => {
  res.sendFile(__dirname + '/client/host/host.js');
})

app.get('/canvas/canvas.html', (req, res) => {
  res.sendFile(__dirname + '/client/canvas/canvas.html');
})

app.get('/canvas/canvas.js', (req, res) => {
  res.sendFile(__dirname + '/client/canvas/canvas.js');
})

app.get('/host/eraser.png', (req, res) => {
  res.sendFile(__dirname + '/client/host/eraser.png');
})

app.get('/canvas/canvasButton.js', (req, res) => {
  res.sendFile(__dirname + '/client/canvas/canvasButton.js');
})

app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/node_modules/socket.io/socket.io.js'));
})

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
