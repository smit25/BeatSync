// const username = require('./signuproute')
// var auth = require('../middleware/auth')
const path = require('path')
var appDir = path.dirname(require.main.filename)
const url = makeid(6)

var Room = require('../model/Rooms')
function makeid (length) {
  var result = ''
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    if ((i + 1) % 3 === 0 && i !== 5) {
      result += '-'
    }
  }
  return result
}

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('login')
  })
  console.log('Smit')
  app.get('/signin', (req, res) => {
    res.render('signin')
  })
  app.get('/signup', (req, res) => {
    res.render('signup')
  })

  app.get('/room/:url', (req, res) => {
    console.log(url + ' url')
    res.sendFile(path.join(appDir + '/public/socket.html'))
  })

  app.post('/room/:url', (req, res) => {
    const roomUrl = req.body['joinurl']
    console.log(roomUrl)
    try {
      let room = Room.findOne({ roomUrl })
      console.log('room: ' + room)
      if (room == roomUrl) {
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
}
