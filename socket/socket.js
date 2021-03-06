var isPlaying = 0
var User = require('../model/Users')
var Room = require('../model/Rooms')
const {
  userLeave,
  getRoomUsers,
  addUser
} = require('../public/utils/socketFunc')

// Operate on socket.io
var socketfile = (io) => {
  io.on('connection', socket => {
    console.log('socket works!')

    socket.on('joinRoom', async ({ userId, room }) => {
      const userjson = await User.findById(userId)
      const username = userjson.username

      let id = socket.id
      // store user data in an object
      const userSave = { socketId: id, username: username }

      // Find room of the user from database
      let roomRecord = await Room.findOne({ roomUrl: room })
      console.log('roomFound (joinRoom event in socket.js) ' + roomRecord)

      // Add new user to room
      if (roomRecord != null) {
        roomRecord.roomUsers.push(userSave)
        await roomRecord.save()
      } else {
        // Make new Room
        roomRecord = new Room({
          roomUrl: room,
          adminId: id,
          roomUsers: [userSave]
        })
        await roomRecord.save()
      }
      console.log('Updated room(JoinRoom in socket.js) ' + roomRecord)
      // join the room
      socket.join(room)

      // initialize getRoomUsers
      let users = await getRoomUsers(room)

      // Add User to Schema
      await addUser(id, room, username)

      // Welcome current user
      socket.emit('message', 'Welcome to BeatSync!')

      // Broadcast when a user connects
      socket.broadcast
        .to(room)
        .emit(
          'message',
          `${username} has joined the room`)

      // Send users and room info

      io.to(room).emit('roomUsers', {
        room: room,
        users: users
      })
    })

    // playForAll
    socket.on('playForAll', async ({ room, songUrl }) => {
      console.log('Playing ' + songUrl + ' for ' + room)
      io.to(room).emit('play', {
        room: room,
        songUrl: songUrl
      })
    })

    // Resume song
    socket.on('resumeForAll', async ({ room }) => {
      console.log('Resuming song for ' + room)
      io.to(room).emit('resume')
    })

    // Pause Song
    socket.on('pauseForAll', async ({ room }) => {
      console.log('Pausing song for ' + room)
      io.to(room).emit('pause')
    })

    socket.on('stopForAll', async ({ flag }) => {
      isPlaying = flag
    })
    // Runs when client disconnects
    socket.on('disconnect', async () => {
      const user = await userLeave(socket.id)
      console.log(user)
      const leftUser = await Room.findOne({ roomUrl: user.room })
      console.log('admin check in disconnect: ' + leftUser.adminId)

      // Destroy the room if admin leaves
      if (leftUser.adminId == socket.id) {
        console.log('Admin disconnected')
        io.of('/').in(user.room).clients((error, socketIds) => {
          if (error) { throw error }
          socketIds.forEach(socketId => io.sockets.connected[socketId].disconnect())
        })
        io.to(user.room).emit('destroyRoom')
        await Room.findOneAndRemove({ roomUrl: user.room })
      } else {
        console.log('leftUser in disconnect ' + user)
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
module.exports = { socketfile, isPlaying }
