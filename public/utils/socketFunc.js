// const express = require('express')
var Room = require('../../model/Rooms')
var UserInRoom = require('../../model/userInRoom')

// User leaves chat
async function userLeave (id) {
  try {
    let userInRoomRecord = await UserInRoom.findOne({ socketId: id })
    console.log('leftUserRoom ' + userInRoomRecord)
    let roomRecord = await Room.findOne({ roomUrl: userInRoomRecord.roomUrl })
    // console.log('RoomRecord: ' + roomRecord)
    let roomUsers = roomRecord.roomUsers
    let item = roomUsers.find(user => user.socketId == id)
    // console.log('------------ ' + item + ' ---------')
    let index = roomUsers.indexOf(item)
    let leftUser = { room: roomRecord.roomUrl,
      username: item.username }

    if (index !== -1) {
      roomUsers.splice(index, 1)
      // console.log('!!!!!!!1 ' + roomUsers)
      roomRecord.roomUsers = roomUsers
      await roomRecord.save()
      console.log('leftUser: ' + leftUser)
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

// Add user to userInRoom
async function addUser (id, room, username) {
  try {
    let user = new UserInRoom({
      socketId: id,
      roomUrl: room,
      username: username
    })
    console.log('userAdded: ' + user)
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
