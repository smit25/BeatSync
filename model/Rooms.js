const mongoose = require('mongoose')

var roomSchema = new mongoose.Schema({
// Has an id by default
  roomUrl: {
    type: String,
    required: true
  },
  adminId: String,
  roomUsers: [
      {
      username: String}
  ]
})

const roomModel = mongoose.model('Room', roomSchema)
module.exports = roomModel
