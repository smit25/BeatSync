const express = require('express')
const router = express.Router()
const path = require('path')
var appDir = path.dirname(require.main.filename)

router.get('/createRoom', (req, res) => {
  res.sendFile(path.join(appDir + '/public/generateUrl.html'))
})

router.get('/joinRoom', (req, res) => {
  res.render(path.join(appDir + '/public/joinroom.html'))
})

module.exports = router
