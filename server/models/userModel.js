const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: {type: String, required: true},
  password: {type: String},
  notes: {type: String},
  canvas: {type: String}
});

// collection is being created depending on what the export model is
module.exports = mongoose.model('User', userSchema);