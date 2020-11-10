
const roomName = document.getElementById('room-name')
var isPlaying = false

const socket = io()
var cookie = document.cookie
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
var cookies = getCookiesMap(cookie)
const userId = cookies['userId']
var device = cookies['deviceId']
var token = cookies['spotify_token']
var adminId = cookies['adminId']

// RoomUrl for joinRoom event
const urlParams = window.location.href
console.log('url: ' + urlParams)
const queryArr = urlParams.split('/')
var room = String(queryArr.slice(-1))
if (room[ room.length - 1 ] == '?') {
  room = room.slice(0, -1)
}
console.log(room)

// var token = 'BQCPG-P9sjK-)OGBfEeGOzQBU_2FcV3-lA9RivuzhpRa5nL9mFlm4z_dKrZTiuLsXtKKvNTVJ7E4D1IH6Goo5lYX6aVZmnxDtr7NTdHSVueIP0YInOu9YIHsEqnAsBi3Yiv3YE2xdc4wRS64UYL9_VLuF81ksovaYyPTvrepLGsDvFxdNgWk'
// Play a song in spotify
// function play (songUrl) {
//   $.ajax({
//     url: `https:/api.spotify.com/v1/me/player/play?device_id=${device}`,
//     type: 'PUT',
//     headers: {
//       'Authorization': 'Bearer ' + token,
//       'Content-Type': 'application/json',
//       'Accept' : 'application/json'
//     },
//     data: JSON.stringify({
//       'uris': [songUrl],
//       'position_ms': 0
//     }),
//     success: function (response) {
//       isPlaying = true
//       console.log('Play/Start Request made')
//       console.log(response)
//     }
//   })
// }

// Resume a song in spotify
function resume () {
  $.ajax({
    url: `https:/api.spotify.com/v1/me/player/play?device_id=${device}`,
    type: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    success: function (response) {
      console.log('Resume request made')
    }
  })
}

async function play(songUrl){
var url = `https:/api.spotify.com/v1/me/player/play?device_id=${device}`
const response = await fetch(url, {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'uris': [songUrl],
    'position_ms': 0
  })
});
console.log(response.json)
}

// Pause a song in spotify
function pause () {
  $.ajax({
    url: `https://api.spotify.com/v1/me/player/pause?device_id=${device}`,
    type: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    success: function (response) {
      console.log('Pause Request made!')
      console.log(response)
    }
  })
}

// On clicking play
function playForAll () {
// check if a song is selected
  if (track != '') {
    if (isPlaying) {
      socket.emit('resumeForAll', { room })
    } else if (!isPlaying) {
      console.log('playforAll track: ' + track)
      socket.emit('playForAll', { room: room, songUrl: track })
    }
  } else {
    window.alert('Please select a song!')
  }
}

// Socket events in response to play
socket.on('resume', () => {
  resume()
})
socket.on('play', ({ songUrl }) => {
  play(songUrl)
})

// On clicking Pause
function pauseForAll () {
  // check if a song is playing
  if (track != '') {
    socket.emit('pauseForAll', { room })
  } else {
    window.alert('Please play a song!')
  }
}

// Socket Event in response to pause
socket.on('pause', () => {
  pause()
})

// On clicking Stop
function stopForAll () {
  track = ''
  isPlaying = false
  socket.emit('stopForAll', { isPlaying })
  pause()
}

// Join chatroom
socket.emit('joinRoom', { userId, room })

// Message from server
socket.on('message', message => {
  console.log(message)
})

// Destroy room
socket.on('destroyRoom', () => {
  window.location.replace('/roomDestroy')
})

// Get room and users on the page dynamically
socket.on('roomUsers', ({ room, users }) => {
  console.log(room)
  console.log(users)
  outputRoomName(room)
  outputUsers(users)
})
// Add room name to our page
function outputRoomName (room) {
  roomName.innerText = room
}

// Add users to our page
function outputUsers (users) {
  var userDiv = document.getElementById('userList')
  userDiv.appendChild(makeUL(users))
}

function makeUL (array) {
  var list = document.createElement('ul')
  console.log(array.length)
  for (var i = 0; i < array.length; i++) {
    // Create the list item:
    var item = document.createElement('li')
    item.appendChild(document.createTextNode(array[i].username))
    list.appendChild(item)
  }
  return list
}

// Hide playback for non-host users
function hide () {
  if (!adminId) {
    document.getElementById('playback').style.display = 'none'
    document.getElementById('nonAdmin').innerHTML = 'Let the Host Sync the Beat!'
    document.getElementById('playbackSearch').style.display = 'none'
  }
}
window.onload = hide()
