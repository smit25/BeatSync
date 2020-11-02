// const path = require('path')
//  const http = require('http')
// const express = require('express')
var User = require('../model/Users')
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
      const username = await User.findById(userId)
      const user = userJoin(socket.id, username, room)
      console.log(username)
      socket.join(user.room)
      // Welcome current user
      socket.emit('message', 'Welcome to BeatSync!')

      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          `${username} has joined the room`)

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    })

    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id)
      if (user) {
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
