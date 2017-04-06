const userController = require('./../controllers/userController.js');
const canvasController = require('./../controllers/canvasController.js');

module.exports = (app) => {
  // check the database
  app.get('/check', userController.getAllUsers);

  // click event creates user from req.body (obj)
  app.post('/create', userController.createUser);

  // client side grabs username from url to generate this link to reach this route
  app.get('/user/:username', userController.getUser);

  //get notes
  app.get('/notes/:username', userController.getNotes);

  //post notes
  app.post('/notes', userController.postNotes);

  //a route to check for username/password
  app.post('/userCheckpt', userController.verifyUser);

  //create Canvas
  app.post('/createCanvas', canvasController.createCanvas);

  //get Canvas from DB
  app.get('/getCanvas/:roomNum', canvasController.getCanvas);

  app.get('getCanvas/allCanvas', canvasController.getAllCanvas);

  // get current Rooms
  app.get('/getRooms', userController.getRooms);

  //update player when they join room
  app.put('/rooms/:room', userController.joinRoom);

  app.get('/allRooms', userController.getRooms);
  //test route to see if i can get all the canvas in DB & will be JWT test route
  // app.get('/getAllCanvas', canvasController.getAllCanvas);

  // // Delete a user from the database
  // // localhost://3000/user/"name"
  // app.delete('/:name', userController.deleteUser);
}
