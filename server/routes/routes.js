const userController = require('./../controllers/userController.js');
const canvasController = require('./../controllers/canvasController.js');

module.exports = (app) => {
  // check the database
  app.get('/check', userController.getAllUsers);

  // click event creates user from req.body (obj)
  app.post('/create', userController.createUser);

  // client side grabs username from url to generate this link to reach this route
  app.get('/notes/:username', userController.getUser);

  app.put('/check', userController.updateUser);

  //a route to check for username/password
  app.post('/userCheckpt', userController.verifyUser);

  //create Canvas 
  app.post('/createCanvas', canvasController.createCanvas);

  //get Canvas from DB
  app.get('/getCanvas', canvasController.getCanvas);

  //test route to see if i can get all the canvas in DB & will be JWT test route
  // app.get('/getAllCanvas', canvasController.getAllCanvas);

  // // Delete a user from the database
  // // localhost://3000/user/"name"
  // app.delete('/:name', userController.deleteUser);
}