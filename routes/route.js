// const username = require('./signuproute')
// var auth = require('../middleware/auth')
const path = require('path')
var appDir = path.dirname(require.main.filename)

var Room = require('../model/Rooms')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('login')
  })
  // console.log('Smit')
  app.get('/signin', (req, res) => {
    res.render('signin')
  })
  app.get('/signup', (req, res) => {
    res.render('signup')
  })

  app.get('/room/:url', (req, res) => {
    console.log(req.params.url + ' in createRoom.js')
    // Set Admin Id Cookie
    let userId = req.cookies['userId']
    res.cookie('adminId', userId, { httpOnly: false })
    console.log('adminId cookie set: ')
    res.sendFile(path.join(appDir + '/public/socket.html'))
  })

  app.post('/room/:url', async (req, res) => {
    const roomUrl = req.body['joinurl']
    console.log('joinRoom: ' + roomUrl)
    try {
      let room = await Room.findOne({ roomUrl })
      console.log('room: ' + room)
      if (room.roomUrl == roomUrl) {
        res.status(200).sendFile(path.join(appDir + '/public/socket.html'))
      } else {
        res.send('Room does not exist!')
      }
    } catch (err) {
      console.log('Error fetching from database')
      res.send('Error!')
    }
  })

  app.get('/home', (req, res) => {
    let userId = req.cookies['userId']
    console.log(userId)
    if (userId) {
      console.log('userId: ' + userId)
    } else {
      console.log(`Cookie not found`)
    }
    res.render('home')
  })
  app.get('/room/js/main.js', (req, res) => {
    console.log('Sending main.js')
    res.status(200).sendFile(path.join(appDir + '/public/js/main.js'))
  })
}
