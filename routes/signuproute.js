const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

var User = require('../model/Users')

// Check the validity of the input credentials using express-validator
router.post('/signup',
  [
    check('username', 'Please Enter a Username').not().isEmpty(),
    check('email', 'Please Enter a Valid Email').isEmail(),
    check('password', 'Please Enter a Valid Password').isLength({ min: 6
    })
  ],

  // Middleware for checking errors
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors) {
      return res.status(400).json({
        errors: errors.array()
      })
    }
    // Store the credentials in an object
    const { username, email, password } = req.body

    try {
      console.log('signuproute halfway')
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({
          errMsg: 'User with this email already exists!'
        })
      }
      // Store the new user in the User Collection
      let today = new Date().toISOString().slice(0, 10)
      user = new User({
        username, email, password, today
      })
      // console.log(user)

      // Generate encrypted password using bcrypt
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      // async save the record in the collection
      await user.save()

      // Store userId cookie
      res.cookie('userId', user.id)
      console.log('userId in signup stored')

      // Parameters which can be extracted from the jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          username: user.username
        }
      }

      // Method for creating token
      jwt.sign(
        payload, 'justanotherasshole', { expiresIn: 10000 }, (err, token) => {
          if (err) throw err
          res.status(200).json({
            token
          }
          )
        }
      )
      // Redirecting to Spotify Authentiction
      res.redirect('/spotifylogin')
      // Throw exception
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Saving Error')
      console.log('Saving Error')
    }
  }
)

module.exports = router
