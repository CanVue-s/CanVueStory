const mongoose = require('mongoose');

const mongoUrl = 'mongodb://jeffreyma:jeffreyma@ec2-52-89-83-246.us-west-2.compute.amazonaws.com:27017/scratchDB';

mongoose.connect(mongoUrl, function () {
  // WARNING: every connection will drop database, comment this out when ready to deploy
  // mongoose.connection.db.dropDatabase();
});
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});