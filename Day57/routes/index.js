var express = require('express')
var router = express.Router()
const authController = require('../controllers/auth.controller')
/* GET home page. */
router.get('/', authController.index)

router.get('/auth/sign-up', authController.signUp)
router.post('/auth/sign-up', authController.handleSignUp)
router.get('/auth/sign-in', authController.signIn)
router.post('/auth/sign-in', authController.handleSignIn)
router.get('/auth/sign-out', authController.signOut)

module.exports = router
