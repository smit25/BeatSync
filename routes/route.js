// const username = require('./signuproute')
// var auth = require('../middleware/auth')

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

  app.get('/home', (req, res) => {
    res.render('home')
  })
}
