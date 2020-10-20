var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'f6e2e07a48b742278079ce02f7f8df4f'; // Your client id
var client_secret = '37175be48eb748c49b0c9c1f8e4c8d08'; // Your secret
var redirect_uri = 'http://localhost:8888/'; // Your redirect uri