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
    User.findOne({ username: username }, (err, result) => {
      if (err) {
        return res.status(418).json(err);
      } else {
        return res.status(200).json(result);
      }
    });
  },

  getNotes(req, res) {
    const username = req.params.username;
    console.log("i am username from getNotes: ", username)
    User.findOne({username: username}, (err, result) => {
      console.log('i am result from getNotes: ', result)
      if (err) {
        return res.status(418).json(err);
      } else {
        return res.status(200).json(result.notes)
      }
    })
  },
  //does not work yet...
  postNotes(req, res) {
    const note = req.body.notes;
    console.log("i am req.body from postNotes: ", req.body)
    console.log('i am req.body.notes: ', req.body.notes)

    //need to find either username or roomNum
    User.findOneAndUpdate({username: req.body.username}, {"notes.$.note": note}, (err, result) => {
      if (err) console.log('did not update new notes')
      else console.log('successfully changed the note')
    })
  },

  //added verifyUser method in order to check for correct username/password
  verifyUser(req, res, next) {
    User.findOne({username: req.body.username}, (err, result) => {
      //original login checker
      console.log("req.body", req.body)
      console.log("result", result)
      if (req.body.password !== result.password) {
        return res.status(400).end({error: 'User/Password Verification Failed'});
      } else {
        //we are creating and send back the access token
        let myToken = jwt.sign({username: req.body.username}, 'forbiddenCookieJar');
        res.cookie('jwtcookies', myToken);
        //res.status(200).json(myToken);
        //res.redirect('/');
        next();
      }
    })
  }

};

module.exports = userController;
