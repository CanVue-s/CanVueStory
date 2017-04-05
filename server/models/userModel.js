const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new Schema({
  roomNum: {type: Number},
  dateCreated: {type: Date},
  note: {type: String}
})


const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  notes: [noteSchema]
});

// collection is being created depending on what the export model is
module.exports = mongoose.model('User', userSchema);