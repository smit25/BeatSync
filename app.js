var express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var cors = require('cors')
var cookieParser = require('cookie-parser')
var http = require('http')
var app = express()
const server = http.createServer(app)
const { socketfile, isPlaying } = require('./socket/socket')

// Declaring Mongo Sevrer
var mongoServer = require('./config/database')
// Declaration in express for identifying static files
app.use(express.static(path.join(__dirname, '/public')))

// Initializing the express and socket server
const socketio = require('socket.io')
const io = socketio(server)
socketfile(io)

// Declaring the Routes
var routes = require('./routes/route')
var signin = require('./routes/signuproute')
var signup = require('./routes/signinroute')
var spotifyLogin = require('./routes/spotifyLoginroute')
var homeRoute = require('./routes/homeRoute')

// Database Server
mongoServer()

// Setting the template engine
app.set('view engine', 'ejs')

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next()
})

// Declaring CORS and Cookie-Parser middleware
app.use(cors({ origin: true, credentials: true })).use(cookieParser())

// Initialising Body-Parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Calling the Routes
routes(app)
spotifyLogin(app)
app.use('/', homeRoute)
app.use('/', signin)
app.use('/', signup)

// Run the server
const host = process.env.PORT || 3000
server.listen(host)
console.log('Hey server is running')
