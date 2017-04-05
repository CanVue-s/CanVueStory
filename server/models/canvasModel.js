const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  roomNum: {type: String},
  dateCreated: {type: String},
  canvas: {type: String}
});

// collection is being created depending on what the export model is
module.exports = mongoose.model('Canvas', userSchema);