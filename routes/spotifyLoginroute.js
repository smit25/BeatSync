var request = require('request') // "Request" library
var querystring = require('querystring')

var client_id = 'f6e2e07a48b742278079ce02f7f8df4f' // Your client id
var client_secret = '37175be48eb748c49b0c9c1f8e4c8d08' // Your secret
var redirect_uri = 'http://localhost:3000/home/' // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = (length) => {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

var stateKey = 'spotify_auth_state'

module.exports = (app) => {
  app.get('/spotifylogin', (req, res) => {
    res.render('spotifylogin')
  })
  app.get('/login', (req, res) => {
    var state = generateRandomString(16)
    res.cookie(stateKey, state)

    // your application requests authorization
    var scope = 'user-read-private user-read-email'
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }))
  })
  // your application requests refresh and access tokens
  // after checking the state parameter
  app.get('/callback', (req, res) => {
    var code = req.query.code || null
    var state = req.query.state || null
    var storedState = req.cookies ? req.cookies[stateKey] : null

    if (state === null || state !== storedState) {
      res.redirect('spotifylogin' +
      querystring.stringify({
        error: 'state_mismatch'
      }))
    } else {
      res.clearCookie(stateKey)
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      }

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token
          var refresh_token = body.refresh_token

          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          }

          // use the access token to access the Spotify Web API
          request.get(options, (error, response, body) => {
            console.log(body)
            if (error) {
              console.log(error)
            }
          })

          // We can also pass the token to the browser to make requests from there
          res.redirect('spotifyLogin' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }))
        } else {
          res.redirect('spotifylogin' +
          querystring.stringify({
            error: 'invalid_token'
          }))
        }
      })
    }
  })

  app.get('/refresh_token', (req, res) => {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    }

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token
        res.send({
          'access_token': access_token
        })
      }
    })
  })
}
