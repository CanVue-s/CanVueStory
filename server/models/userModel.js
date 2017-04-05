const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  roomNum: {type: String},
  dateCreated: {type: String, default: Date.now},
  note: {type: String, default: ''}
})

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  room: {type: String, default: ''},
  notes: [noteSchema]
});



// collection is being created depending on what the export model is
module.exports = mongoose.model('User', userSchema);