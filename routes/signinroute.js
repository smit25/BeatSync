const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

var User = require('../model/Users')

// Verifying input credential type using express-validator
router.post(
  '/signin',
  [
    check('email', 'Please Enter a Valid Email').isEmail(),
    check('password', 'Please Enter the correct Password').isLength({ min: 6 })
  ],

  // Middleware for checking errors
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    // Storing the input in an object
    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({
          message: 'User does not exist, please Sign Up'
        })
      }
      // Password verification
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          message: 'Incorrect Password'
        })
      }

      // Checking and storing userId Cookie
      let userId = req.cookies['userId']
      if (!userId) {
        res.cookie('userId', user.id)
        // console.log(user.id)
        console.log('userId in signin stored!')
        console.log('Hey ' + req.cookies['userId'])
      } else {
        console.log('userId cookie already present!')
      }

      // Parameters which can be extracted from the jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          username: user.username
        }
      }

      // Method for retrieving token
      jwt.sign(
        payload, 'justanotherasshole', { expiresIn: 3600 }, (err, token) => {
          if (err) throw err
          res.status(200).json({
            token
          })
        }
      )

      // Redirect for spotify authentication
      res.redirect('/spotifylogin')
      // Throw exception
    } catch (err) {
      console.error(err)
      res.status(500).json({
        message: 'Server Error'
      })
    }
  }
)

module.exports = router
