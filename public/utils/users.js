// const express = require('express')
var Room = require('../../model/Rooms')

// Join user to chat
async function userJoin (id, username, room) {
  try{
  const user = { id, username, room }
  const userSave = { id, username }
  console.log('inuser.js'+ room)
  let roomRecord = await Room.findOne({ roomUrl: room })
  console.log('userJoin ' + roomRecord)
  if (roomRecord !== null) {
    roomRecord.roomUsers.push(userSave)
    await roomRecord.save()
  } else {
    roomRecord = new Room({
      roomUrl: room,
      admin: id,
      roomUsers: [userSave]
    })
    await roomRecord.save()
    console.log(roomRecord)
  }
  return user
}
  catch(err){
     next(err)
  }
}

// User leaves chat
async function userLeave (id) {
  try{
  let roomRecord = await Room.findOne({ roomUsers: { socketId: id } })
  console.log('roomRecord: ' + roomRecord)
  let roomUsers = roomRecord.roomUsers
  let index = roomUsers.find(user => user.socketId === id)

  if (index !== -1) {
    return roomUsers.splice(index, 1)[0]
  }
}
catch(err){
  next(err)
}
}

// Get room users
async function getRoomUsers (room) {
  try{
  console.log('roomhere :'+ room)
  let roomRecord = await Room.findOne({ roomUrl: room })
   console.log("room-record which we searched for :"+ roomRecord)
   console.log("room-url from database :"+ roomRecord.roomUrl)
   console.log("Room-record from database : "+ roomRecord.roomUsers)
  let roomusers = []
  for (var i = 0; i < roomRecord.roomUsers.length; i++) {
    roomusers.push(roomRecord.roomUsers[i])
  }
  console.log("room-users 1st "+roomusers[0])
  return roomusers
 }
 catch(err){
   next(err)
 }

}

module.exports = {
  userJoin,
  userLeave,
  getRoomUsers
}
