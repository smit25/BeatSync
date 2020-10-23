var express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
var cookieParser = require('cookie-parser')

var mongoServer = require('./config/database')

// Declaring the Routes
var routes = require('./routes/route')
var signin = require('./routes/signuproute')
var signup = require('./routes/signinroute')
var spotifyLogin = require('./routes/spotifyLoginroute')
var home = require('./routes/homeRoute')
var socketio = require('./socket/socket')

// Server
mongoServer()

// Initializing the express and socket server
var app = express()
// socketio(app)

// Setting the template engine
app.set('view engine', 'ejs')

// Rendering static files and cookie parser
app.use(express.static('./public'))
app.use(cors()).use(cookieParser())

// Initialising Body-Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routing
routes(app)
spotifyLogin(app)
app.use('/home', home)
app.use('/', signin)
app.use('/', signup)
// app.use('/', me)

const host = 3000 || process.send.PORT
app.listen(host)
console.log('Hey server is running')
