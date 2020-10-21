const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

const User = require('../model/Users')
router.get('/me', auth, (res, req) => {
  try {
    const user = User.findById(req.user.id)
    res.render('profile', { username: user.username })
  } catch (err) {
    console.error(err)
    res.send({ message: 'Error in Fetching User' })
  }
})

module.exports = router
