const express = require('express')
const router = express.Router()
const path = require('path')
var appDir = path.dirname(require.main.filename)
const url = makeid(6)

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

router.post('/createRoom', async (req, res, next) => {
  res.cookie('roomUrl', url, { httpOnly: false })
  console.log(url)
  console.log('Room cookie set')
  await res.status(200).sendFile(path.join(appDir + '/public/generateUrl.html'))
})
router.post('/joinRoom', (req, res) => {
  res.sendFile(path.join(appDir + '/public/joinroom.html'))
})
module.exports = router
