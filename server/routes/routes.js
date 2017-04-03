const userController = require('./../controllers/userController.js');

module.exports = (app) => {
  // check the database
  app.get('/check', userController.getAllUsers);

  // click event creates user from req.body (obj)
  app.post('/create', userController.createUser);

  // client side grabs username from url to generate this link to reach this route
  app.get('/notes/:user', userController.getUser);

  app.put('/notes/:user', userController.updateUser);

  // // Delete a user from the database
  // // localhost://3000/user/"name"
  // app.delete('/:name', userController.deleteUser);
}