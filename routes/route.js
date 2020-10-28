// const username = require('./signuproute')
// var auth = require('../middleware/auth')
const path = require('path')
var appDir = path.dirname(require.main.filename)

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
