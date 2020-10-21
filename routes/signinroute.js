const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

var User = require('../model/Users')

router.post(
  '/signin',
  [
    check('email', 'Please Enter a Valid Email').isEmail(),
    check('password', 'Please Enter the correct Password').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({
          message: 'User does not exist, please Sign Up'
        })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          message: 'Incorrect Password'
        })
      }

      const payload = {
        user: {
          id: user.id,
          username: user.username
        }
      }

      jwt.sign(
        payload, 'justanotherasshole', { expiresIn: 3600 }, (err, token) => {
          if (err) throw err
          res.status(200).json({
            token
          })
        }
      )
      res.redirect('/spotifylogin')
    } catch (err) {
      console.error(err)
      res.status(500).json({
        message: 'Server Error'
      })
    }
  }
)

module.exports = router
