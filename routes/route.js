// const username = require('./signuproute')
// var auth = require('../middleware/auth')
const path = require('path')
var appDir = path.dirname(require.main.filename)
const url = makeid(6)

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

  app.get('/createRoom', (req, res) => {
    res.cookie('roomUrl', url, { domain: 'localhost:3000' })
    console.log(url)
    const testcookie = req.cookies['roomUrl']
    console.log('HeySmit ' + testcookie)
    res.sendFile(path.join(appDir + '/public/generateUrl.html'))
  })

  app.get('/joinRoom', (req, res) => {
    res.render(path.join(appDir + '/public/joinroom.html'))
  })

  app.post('/Room', (req, res) => {
    res.sendFile(path.join(appDir + '/public/socket.html'))
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
