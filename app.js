var express = require('express')
var routes = require('./routes/route')
const bodyParser = require('body-parser')
var mongoServer = require('./config/database')
var signin = require('./routes/signuproute')
var signup = require('./routes/signinroute')

mongoServer()

var app = express()

app.set('view engine', 'ejs')

app.use(express.static('./public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes(app)
app.use('/', signin)
app.use('/', signup)

const host = 3000 || process.send.PORT
app.listen(host)
console.log('Hey server is running')
