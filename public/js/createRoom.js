const cookie = document.cookie
console.log(cookie)
// Function to process cookie
function getCookiesMap (cookiesString) {
  return cookiesString.split(';')
    .map((cookieString) => {
      return cookieString.trim().split('=')
    })
    .reduce((acc, curr) => {
      acc[curr[0]] = curr[1]
      return acc
    }, {})
}
const cookies = getCookiesMap(cookie)
const roomUrl = cookies['roomUrl']
var token = cookies['spotify_token']
const userId = cookies['userId']
// var token = 'BQD3TLxdH0pLGhsMcQYNGPE2EWyf1a4G7cltCsKLGPyJHYzs3T_rlAWeHsrs9kEWylwQoYuiNKS8KCAzNwr1frJTplRZscJMb-YzbiK0_WWPCYQWLpRS-Lk630EESvSckMWRL7soASUlEVuhypwd-SQDfTWlon4FFKr0UF1fsH_EtP5I'

// Assigning the action to the form
const form = document.getElementById('generateUrlForm')
form.action = '/room/' + roomUrl

// Function to extract and store device id
function deviceid () {
  $.ajax({
    url: `https://api.spotify.com/v1/me/player/devices`,
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    success: function (response) {
      let deviceId = response.devices[0].id
      console.log('Device id stored ' + deviceId)
      let now = new Date()
      now.setTime(now.getTime() + 10 * 3600 * 1000)
      document.cookie = `deviceId = ${deviceId}; expires=${now.toUTCString()}; path = /`
    }
  })
}

function createRoom () {
  deviceid()
  let now = new Date()
  now.setTime(now.getTime() + 10 * 3600 * 1000)
  document.cookie = `adminId = ${userId}; expires=${now.toUTCString()}; path = /`
  try {
    console.log(roomUrl)
    var div = document.getElementById('addUrl')
    div.innerHTML += `Room Id: ${roomUrl}`
  } catch (err) {
    console.log('No roomUrl cookie found')
  }
}

window.onload = createRoom()
