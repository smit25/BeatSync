const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

var User = require('../model/Users')

router.post('/signup',
  [
    check('username', 'Please Enter a Username').not().isEmpty(),
    check('email', 'Please Enter a Valid Email').isEmail(),
    check('password', 'Please Enter a Valid Password').isLength({ min: 6
    })
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors) {
      return res.status(400).json({
        errors: errors.array()
      })
    }
    const { username, email, password } = req.body

    try {
      console.log('working so far')
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({
          errMsg: 'User with this email already exists!'
        })
      }

      let today = new Date().toISOString().slice(0, 10)
      user = new User({
        username, email, password, today
      })
      console.log(user)

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()
      console.log('...')
      const payload = {
        user: {
          id: user.id,
          username: user.username
        }
      }

      jwt.sign(
        payload, 'justanotherasshole', { expiresIn: 10000 }, (err, token) => {
          if (err) throw err
          res.status(200).json({
            token
          }
          )
        }
      )

      res.redirect('/home')
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Saving Error')
      console.log('Saving Error')
    }
  }
)

module.exports = router
// module.exports = userCopy
