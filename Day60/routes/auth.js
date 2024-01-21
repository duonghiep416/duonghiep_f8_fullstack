var express = require('express')
var router = express.Router()
const authController = require('../controllers/auth.controller')
const passport = require('passport')
/* GET home page. */
router.get('/login', authController.login)
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
    failureFlash: true,
    successRedirect: '/'
  })
)

router.get('/logout', (req, res) => {
  req.logout(() => {})
  return res.redirect('/auth/login')
})

router.get('/google/redirect', passport.authenticate('google'))
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/login',
    failureFlash: true,
    successRedirect: '/'
  })
)

router.get('/forgot-password', authController.forgotPassword)
router.post('/forgot-password', authController.handleForgotPassword)
router.get('/reset-password/:token/:email', authController.resetPassword)
router.post('/reset-password/:token/:email', authController.handleResetPassword)

router.get('/register', authController.register)
module.exports = router
