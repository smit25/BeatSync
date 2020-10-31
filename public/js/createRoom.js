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

const form = document.getElementById('generateUrlForm')
form.action = '/room/' + roomUrl
function createRoom () {
  try {
    console.log(roomUrl)
    var div = document.getElementById('addUrl')
    div.innerHTML += `Room Id: ${roomUrl}`
  } catch (err) {
    console.log('No roomUrl cookie found')
  }
}

window.onload = createRoom()
