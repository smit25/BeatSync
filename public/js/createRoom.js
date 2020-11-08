const cookie = document.cookie
console.log(cookie)
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
// const testUrl = 'qwerty'
var token = 'BQD3TLxdH0pLGhsMcQYNGPE2EWyf1a4G7cltCsKLGPyJHYzs3T_rlAWeHsrs9kEWylwQoYuiNKS8KCAzNwr1frJTplRZscJMb-YzbiK0_WWPCYQWLpRS-Lk630EESvSckMWRL7soASUlEVuhypwd-SQDfTWlon4FFKr0UF1fsH_EtP5I'

const form = document.getElementById('generateUrlForm')
form.action = '/room/' + roomUrl
function createRoom () {
  deviceid()
  try {
    console.log(roomUrl)
    var div = document.getElementById('addUrl')
    div.innerHTML += `Room Id: ${roomUrl}`
  } catch (err) {
    console.log('No roomUrl cookie found')
  }
}

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
      console.log('Device id stored')
      let deviceId = response.devices[0].id
      console.log(deviceId)
      document.cookie = `spotify_token = ${deviceId}; path = /`
    }
  })
}
window.onload = createRoom()
