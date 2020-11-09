// Declaring the Mongo Collections
var Room = require('../../model/Rooms')
var UserInRoom = require('../../model/userInRoom')

// User leaves chat
async function userLeave (id) {
  try {
    let userInRoomRecord = await UserInRoom.findOne({ socketId: id })
    console.log('Room of the user that Left in userLeave util ' + userInRoomRecord)
    let roomRecord = await Room.findOne({ roomUrl: userInRoomRecord.roomUrl })
    let roomUsers = roomRecord.roomUsers
    let item = roomUsers.find(user => user.socketId == id)
    let index = roomUsers.indexOf(item)

    let leftUser = { room: roomRecord.roomUrl,
      username: item.username }

    if (index !== -1) {
      roomUsers.splice(index, 1)
      roomRecord.roomUsers = roomUsers
      await roomRecord.save()
      console.log('leftUser in userLeave util: ' + leftUser)
      return leftUser
    }
  } catch (err) {
    console.log(err)
  }
}

// Get room users
async function getRoomUsers (room) {
  try {
    console.log('roomUrl in getRoomUsers util ' + room)
    let roomRecord = await Room.findOne({ roomUrl: room })
    let roomusers = []
    for (var i = 0; i < roomRecord.roomUsers.length; i++) {
      roomusers.push(roomRecord.roomUsers[i])
    }
    console.log('Users in the room(getRoomUsers util): ' + roomusers)
    return roomusers
  } catch (err) {
    console.log(err)
  }
}

// Add user to userInRoom
async function addUser (id, room, username) {
  try {
    let user = new UserInRoom({
      socketId: id,
      roomUrl: room,
      username: username
    })
    console.log('userAdded in addUser util: ' + user)
    await user.save()
  } catch (err) {
    console.log('error: couldn;t save user in room')
  }
}

module.exports = {
  userLeave,
  getRoomUsers,
  addUser
}
