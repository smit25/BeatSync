// const path = require('path')
//  const http = require('http')
// const express = require('express')
var User = require('../model/Users')
var Room =require('../model/Rooms')
const {
  userJoin,
  // getCurrentUser,
  userLeave,
  getRoomUsers
} = require('../public/utils/users')

module.exports = (io) => {
  io.on('connection', socket => {
    console.log('socket works!')
    socket.on('joinRoom', async ({ userId, room }) => {
      const userjson = await User.findById(userId)
      //console.log("saloni")
     // console.log(userjson)
      const username=userjson.username;
      //console.log(username)
      //console.log(room)
      console.log(socket.id)
      let id=socket.id
      console.log(id)
  //    const user={id,username,room}
      const userSave = {username }
      console.log('inuser.js '+ room)
       let roomRecord = await Room.findOne({ roomUrl: room })
      console.log('userJoin ' + roomRecord)
      if (roomRecord !== null) {
        roomRecord.roomUsers.push(userSave)
        await roomRecord.save() } 
      else {
          roomRecord = new Room({
           roomUrl: room,
           adminId: id,
           roomUsers: [userSave]
    })
      await roomRecord.save()
    console.log(roomRecord)
  }
      console.log(room)
      socket.join(room)
      // Welcome current user
      socket.emit('message', 'Welcome to BeatSync!')

      // Broadcast when a user connects
      socket.broadcast
        .to(room)
        .emit(
          'message',
          `${username} has joined the room`)

      // Send users and room info
      console.log("damn "+room)
      //var roomusers = getRoomUsers(room)
      io.
      to(room).
      emit('roomUsers',
       {
        room: room,
        users: getRoomUsers(room)
      })
    })

    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id)
      if (user) {
        io.to(room).emit(
          'message', `${username} has left the chat`)

        // Send updated users and room info
        io.to(room).emit('roomUsers', {
          room: room,
          users: getRoomUsers(room)
        })
      }
    })
  })
}
