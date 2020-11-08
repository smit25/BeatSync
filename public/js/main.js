
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
const room = cookies['roomUrl']
// const token = cookies['spotify_token']
var token = 'BQCPG-P9sjK-OGBfEeGOzQBU_2FcV3-lA9RivuzhpRa5nL9mFlm4z_dKrZTiuLsXtKKvNTVJ7E4D1IH6Goo5lYX6aVZmnxDtr7NTdHSVueIP0YInOu9YIHsEqnAsBi3Yiv3YE2xdc4wRS64UYL9_VLuF81ksovaYyPTvrepLGsDvFxdNgWk'

var device = '269d7d4047552e80e84edaebf1b3488dc05c3836'
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

function play (songUrl) {
  $.ajax({
    url: `https:/api.spotify.com/v1/me/player/play?device_id=${device}`,
    type: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      'uris': [songUrl],
      'position_ms': 0
    }),
    success: function (response) {
      isPlaying = true
      console.log('Play/Start Request made')
      console.log(response)
    }
  })
}

function playForAll () {
// check if a song is selected
  if (track != '') {
    if (isPlaying) {
      socket.emit('resumeForAll', { room })
    }
    else if (!isPlaying) {
      console.log('playforAll track: ' + track)
      socket.emit('playForAll', { room: room, songUrl: track })
    }
  } else {
    window.alert('Please select a song!')
  }
}

socket.on('resume', () => {
  resume()
})
socket.on('play', ({ songUrl }) => {
  play(songUrl)
})

function pauseForAll () {
  // check if a song is playing
  if (track != '') {
    socket.emit('pauseForAll', { room })
  } else {
    window.alert('Please play a song!')
  }
}

socket.on('pause', () => {
  pause()
})
// Join chatroom
socket.emit('joinRoom', { userId, room })

// Get room and users on the page dynamically
socket.on('roomUsers', ({ room, users }) => {
  console.log(room)
  console.log(users)
  outputRoomName(room)
  outputUsers(room)
})

// Message from server
socket.on('message', message => {
  console.log(message)
})

// Add room name to our page
function outputRoomName (room) {
  roomName.innerText = room
}

// Add users to our page
function outputUsers (users) {
  // console.log('users here' + users[0])
}
