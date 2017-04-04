const mongoose = require('mongoose');

//jeff's original mongoDB link
//const mongoUrl = 'mongodb://jeffreyma:jeffreyma@ec2-52-89-83-246.us-west-2.compute.amazonaws.com:27017/scratchDB';

//new mLab link by Alex
const mongoUrl = 'mongodb://canvuestory:canvuestory@ds151070.mlab.com:51070/canvuestory-db';

mongoose.connect(mongoUrl, function () {
  // WARNING: every connection will drop database, comment this out when ready to deploy
   //mongoose.connection.db.dropDatabase();
});
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});