const User = require('./vueTestModel');

const vueTestController = {
  createUser(req, res) {
    const user = new User({"username": req.body.username, "createdAt": req.body.createdAt, "message": req.body.message});
    user.save((err) => {
      if (err) {
        res.status(418).json(err);
      } else {
        res.status(200).json(user);
      }
      return;
    })
  },

  getMessages(req, res) {
    User.find({}, function(err, users){
        if(err){
          console.log(err);
        } else{
          res.json(users);
        }
    })
  },

  getAllUsers(next) {
    User.find({}, next);
  }
};

module.exports = vueTestController;
