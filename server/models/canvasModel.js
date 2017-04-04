const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  roomNum: {type: Number},
  dateCreated: {type: Date},
  canvas: {type: String}
});

// collection is being created depending on what the export model is
module.exports = mongoose.model('Canvas', userSchema);