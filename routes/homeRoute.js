const express = require('express')
const router = express.Router()

router.get('/createRoom', (req, res) => {
  res.render('generateUrl')
})

router.get('/joinRoom', (req, res) => {
  res.render('joinroom')
})

router.post('/Room', (req, res) => {
  console.log('aaa')
  res.redirect('Room')
})

module.exports = router
