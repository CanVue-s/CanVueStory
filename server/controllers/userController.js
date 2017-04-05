const User = require('./../models/userModel');

const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

const userController = {

  getAllUsers(req, res) {
    User.find({}, (err, results) => {
      if (err) {
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
    const username = req.params.username;
    User.findOne({ username: username }, (err, results) => {
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
  },
  //added verifyUser method in order to check for correct username/password
  verifyUser(req, res) {
    User.findOne({username: req.body.username}, (err, result) => {
      //original login checker
      console.log("req.body", req.body)
      console.log("result", result)
      if (req.body.password !== result.password) {
        throw err
      } else {
        //we are creating and send back the access token
        let myToken = jwt.sign({username: req.body.username}, 'forbiddenCookieJar');
        res.status(200).json(myToken);
        //res.redirect('/');
      }
    })
  }

};

module.exports = userController;
