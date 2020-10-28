// const socketio = require('socket.io')

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Hey socket connected!')
    socket.send('Hey!!!')

    socket.on('disconnect', () => {
      console.log('disconnected')
    })
  })
}
