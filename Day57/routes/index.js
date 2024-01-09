var express = require('express')
var router = express.Router()
const authController = require('../controllers/auth.controller')
/* GET home page. */
router.get('/', async function (req, res, next) {
  if (!req.session?.user) {
    res.redirect('/auth/sign-in')
    return
  }
  res.render('index', { title: 'Trang chủ', username: req.session.user })
})

router.get('/auth/sign-up', authController.signUp)
router.post('/auth/sign-up', authController.handleSignUp)
router.get('/auth/sign-in', authController.signIn)
router.post('/auth/sign-in', authController.handleSignIn)
router.get('/auth/sign-out', (req, res) => {
  req.session.destroy()
  res.redirect('/auth/sign-in')
})

module.exports = router
