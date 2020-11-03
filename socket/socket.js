// const path = require('path')
//  const http = require('http')
// const express = require('express')
var User = require('../model/Users')
var Room = require('../model/Rooms')
const {
  // getCurrentUser,
  userLeave,
  getRoomUsers
} = require('../public/utils/users')

module.exports = (io) => {
  io.on('connection', socket => {
    console.log('socket works!')
    socket.on('joinRoom', async ({ userId, room }) => {
      const userjson = await User.findById(userId)
      const username = userjson.username

      console.log(socket.id)
      let id = socket.id

      const userSave = { socketId: id, username: username }
      console.log('in user.js ' + userSave)

      let roomRecord = await Room.findOne({ roomUrl: room })
      console.log('roomFound ' + roomRecord)

      if (roomRecord !== null) {
        roomRecord.roomUsers.push(userSave)
        await roomRecord.save()
      } else {
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

      // initialize getRoomUsers
      let users = await getRoomUsers(room)
      // Welcome current user
      socket.emit('message', 'Welcome to BeatSync!')

      // Broadcast when a user connects
      socket.broadcast
        .to(room)
        .emit(
          'message',
          `${username} has joined the room`)

      // Send users and room info
      // var roomusers = getRoomUsers(room)
      io.to(room).emit('roomUsers', {
        room: room,
        users: users
      })
    })

    // Runs when client disconnects
    socket.on('disconnect', async () => {
      const user = await userLeave(socket.id)
      if (user) {
        console.log('leftUser ' + user)
        io.to(user.room).emit(
          'message', `${user.username} has left the chat`)

        // Send updated users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        })
      }
    })
  })
}
