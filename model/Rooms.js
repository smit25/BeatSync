const mongoose = require('mongoose')

var roomSchema = new mongoose.Schema({
// Has an id by default
  roomName: {
    tyoe: String,
    required: true
  }
})
const roomModel = mongoose.model('Room', roomSchema)
module.exports = roomModel
