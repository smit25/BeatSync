const express = require('express')
var Room = require('../../model/Rooms')
// Join user to chat
async function userJoin (id, username, room) {
  const user = { id, username, room }
  let roomRecord = Room.findOne({ room })
  if (roomRecord) {
    roomRecord.roomUsers.push(username)
    await roomRecord.save()
  }
  else {
    roomRecord = new Room({
      roomUrl: room,
      roomUsers: [username]
    })
    await roomRecord.save()
  }
  return user
}

// Get current user
async function getCurrentUser (id) {
  return users.find(user => user.id === id)
}

// User leaves chat
async function userLeave (id) {
  const index = users.findIndex(user => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

// Get room users
async function getRoomUsers (room) {
  return users.filter(user => user.room === room)
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
}
