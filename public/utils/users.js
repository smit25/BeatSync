// const express = require('express')
var Room = require('../../model/Rooms')

// User leaves chat
async function userLeave (id) {
  try {
    let roomRecord = await Room.findOne({ roomUsers: { socketId: id } })
    console.log('leftUserRoom ' + roomRecord)
    let roomUsers = roomRecord.roomUsers
    let index = roomUsers.find(user => user.socketId === id)
    let leftUser = { room: roomRecord.roomRecord,
      username: roomUsers[index].username }

    if (index !== -1) {
      roomUsers = roomUsers.splice(index, 1)[0]
      roomRecord.roomUsers = roomUsers
      await roomRecord.save()
      return leftUser
    }
  } catch (err) {
    console.log(err)
  }
}

// Get room users
async function getRoomUsers (room) {
  try {
    console.log('roomhere :' + room)
    let roomRecord = await Room.findOne({ roomUrl: room })
    let roomusers = []
    for (var i = 0; i < roomRecord.roomUsers.length; i++) {
      roomusers.push(roomRecord.roomUsers[i])
    }
    console.log(roomusers)
    return roomusers
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  userLeave,
  getRoomUsers
}
