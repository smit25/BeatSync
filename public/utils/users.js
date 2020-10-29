// const express = require('express')
var Room = require('../../model/Rooms')

// Join user to chat
async function userJoin (id, username, room) {
  const user = { id, username, room }
  const userSave = { id, username }
  let roomRecord = Room.findOne({ roomUrl: room })
  if (roomRecord) {
    roomRecord.roomUsers.push(userSave)
    await roomRecord.save()
  } else {
    roomRecord = new Room({
      roomUrl: room,
      roomUsers: [userSave]
    })
    await roomRecord.save()
  }
  return user
}

// User leaves chat
async function userLeave (id) {
  let roomRecord = Room.findOne({ roomUsers: { socketId: id } })
  let roomUsers = roomRecord.roomUsers
  let index = roomUsers.find(user => user.socketId === id)

  if (index !== -1) {
    return roomUsers.splice(index, 1)[0]
  }
}

// Get room users
async function getRoomUsers (room) {
  let roomRecord = Room.findOne({ roomUrl: room })
  let roomUsers = []
  for (var i = 0; i < roomRecord.roomUsers.length; i++) {
    roomUsers.push(roomRecord.roomUsers[i])
  }
  return roomUsers
}

module.exports = {
  userJoin,
  userLeave,
  getRoomUsers
}
