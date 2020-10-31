
function createRoom () {
  const cookie = document.cookie
  const roomUrl = cookie['roomUrl']
  console.log('hey' + roomUrl)
  try {
    console.log(roomUrl)
    var div = document.getElementById('addUrl')
    div.innerHTML += `Room Id: ${roomUrl}`
  } catch (err) {
    console.log('No roomUrl cookie found')
  }
}
window.onload = createRoom()
