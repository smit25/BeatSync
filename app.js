var express = require('express')
var routes = require('./routes/loginroute')
// const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var mongoServer = require('./config/database')
var user = require('./routes/signuproute')

mongoServer()

var app = express()

app.set('view engine', 'ejs')

app.use(express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes(app)
app.use('/', user)

const host = 3000 || process.send.PORT
app.listen(host)
console.log('Hey server is running')
