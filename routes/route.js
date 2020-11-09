var auth = require('../middleware/auth')
var homeauth = require('../middleware/homeauth')
const path = require('path')
var appDir = path.dirname(require.main.filename)

// Initialising Room Collection from Mongo
var Room = require('../model/Rooms')

// Routing
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('login')
  })

  app.get('/searchtest', auth, (req, res) => {
    res.sendFile(path.join(appDir + '/public/searchtest.html'))
  })

  app.get('/signin', (req, res) => {
    res.render('signin')
  })

  app.get('/signup', (req, res) => {
    res.render('signup')
  })
  // Create Room route
  app.get('/room/:url', auth, (req, res) => {
    console.log(req.params.url + ' in createRoom.js')
    // Set Admin Id Cookie
    let userId = req.cookies['userId']
    res.cookie('adminId', userId, { httpOnly: false })
    console.log('adminId cookie set: ')
    res.sendFile(path.join(appDir + '/public/socket.html'))
  })
  // Join Room route
  app.post('/room/:url', auth, async (req, res) => {
    const roomUrl = req.body['joinurl']
    console.log('joinRoom: ' + roomUrl)
    // Check if the entered room url exists
    try {
      let room = await Room.findOne({ roomUrl })
      console.log('room: ' + room)
      if (room.roomUrl == roomUrl) {
        res.status(200).redirect('/room/' + roomUrl)
      } else {
        res.send('Room does not exist!')
      }
    } catch (err) {
      console.log('Error fetching from database')
      res.send('Error!')
    }
  })

  app.get('/home', homeauth, (req, res) => {
    // homeauth middleware takes care of userId cookie
    res.render('home')
  })

  // Routing for static js files
  app.get('/room/js/main.js', (req, res) => {
    console.log('Sending main.js')
    res.status(200).sendFile(path.join(appDir + '/public/js/main.js'))
  })
  app.get('/room/js/search.js', (req, res) => {
    console.log('Sending search.js')
    res.status(200).sendFile(path.join(appDir + '/public/js/search.js'))
  })
  app.get('/room/js/playback.js', (req, res) => {
    console.log('Sending playback.js')
    res.status(200).sendFile(path.join(appDir + '/public/js/playback.js'))
  })
}
