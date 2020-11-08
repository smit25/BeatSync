const express = require('express')
const router = express.Router()
const path = require('path')
const auth = require('../middleware/auth')
var appDir = path.dirname(require.main.filename)

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

router.post('/createRoom', auth, async (req, res, next) => {
  const url = makeid(6)
  res.cookie('roomUrl', url, { httpOnly: false })
  console.log(url)
  console.log('Room cookie set')
  await res.status(200).sendFile(path.join(appDir + '/public/generateUrl.html'))
})
router.post('/joinRoom', auth, (req, res) => {
  res.sendFile(path.join(appDir + '/public/joinroom.html'))
})
module.exports = router
