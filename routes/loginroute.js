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
}
