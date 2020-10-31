/*
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
*/

const socket = io()
const cookie = document.cookie
const userId = cookie['userId']
const room = cookie['roomUrl']

// Join chatroom
socket.emit('joinRoom', { userId, room })

// Get room and users on the page dynamically
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room)
  outputUsers(users)
})

// Message from server
socket.on('message', message => {
  console.log(message)
})

// Add room name to our page
function outputRoomName (room) {

}

// Add users to our page
function outputUsers (users) {

}
