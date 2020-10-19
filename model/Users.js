const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  // Has an id by default
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})
var userModel = mongoose.model('User', UserSchema)
module.exports = userModel
