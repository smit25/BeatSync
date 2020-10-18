var express = require('express')

var app = express()

app.set('view engine', 'ejs')

app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.send('Hey Smit!!')
})
const host = 3000
app.listen(host)
console.log('Hey server is running')
