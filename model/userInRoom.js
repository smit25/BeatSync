const mongoose = require('mongoose')

const userInRoomSchema = new mongoose.Schema({
  // has an id by default
  socketId: String,
  username: String,
  roomUrl: String
})

const userInRoom = mongoose.model('Users in Rooms', userInRoomSchema)
module.exports = userInRoom
