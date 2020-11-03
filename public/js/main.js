
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

const socket = io()
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
const userId = cookies['userId']
const room = cookies['roomUrl']

// Join chatroom
socket.emit('joinRoom', { userId, room })

// Get room and users on the page dynamically
socket.on('roomUsers', ({ room, users }) => {
  console.log(room)
  console.log(users)
  outputRoomName(room)
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
  console.log('users here' + users[0])
}
