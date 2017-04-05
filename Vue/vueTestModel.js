const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testMsgSchema = new Schema ({
  username: {type: String, required: true},
  createdAt: {type: String},
  message: {type: String}
})


module.exports = mongoose.model('vueTest', testMsgSchema);
