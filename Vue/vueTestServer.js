const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const vueTestController = require('./vueTestController');

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
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/main.js'));
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
});



app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
