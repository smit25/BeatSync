var url = ''
function makeid (length) {
  var result = ''
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    if ((i + 1) % 3 === 0 && i !== 5) {
      result += '-'
    }
  }
  return result
}
function createRoom () {
  url = makeid(6)
  console.log(url)
  var div = document.getElementById('addUrl')
  div.innerHTML += `Room Id: ${url}`
}
window.onload = createRoom()
module.exports = url
