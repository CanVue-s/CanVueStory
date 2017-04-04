const User = require('./../models/userModel');

const userController = {

  getAllUsers(req, res) {
    User.find({}, (err, results) => {
      if (err) {
        console.log('find all users error', err);
        return res.end();
      }
      return res.status(200).json(results);
    });
  },

  createUser(req, res) {
    // console.log(req.body);
    User.create(req.body, (err, userRecord) => {
      if (err) {
        return res.status(400).end({error: 'User Creation Failed'});
      }
      return res.status(200).json(userRecord);
    });
  },

  getUser(req, res) {
    const user = req.params.user;
    User.findOne({ user: user }, (err, results) => {
      if (results === null) {
        return res.status(418).json(err);
      } else {
        return res.status(200).json(results);
      }
    });
  },

  updateUser(req, res) {
    const user = req.params.user;
    const newNotes = req.body.notes;
    console.log(req.body);

    User.update(
      { user: user },
      {
        $set: {
          notes: newNotes
        }
      },
      {
        'upsert': true
      }, function (err, result) {
        if (err) {
          return res.status(418).json(err);
        }
        console.log('updated!');
        return res.end();
      }
    )
  }
};

module.exports = userController;
