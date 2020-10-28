const express = require('express')
const router = express.Router()

router.get('/createRoom', (req, res) => {
  res.render('generateUrl')
})

router.get('/joinRoom', (req, res) => {
  res.render('joinroom')
})

module.exports = router
