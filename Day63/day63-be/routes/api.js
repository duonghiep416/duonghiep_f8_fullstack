var express = require('express')
var router = express.Router()
const passport = require('passport')
const authController = require('../controllers/api/auth.controller')
const jwt = require('jsonwebtoken')
/* GET home page. */
router.get('/google/redirect', passport.authenticate('google'))
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/login',
    successRedirect: '/'
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY)
    res.cookie('token', token, { maxAge: 900000, httpOnly: true })
    res.redirect(`/authSuccess?token=${token}`)
  }
)

module.exports = router
