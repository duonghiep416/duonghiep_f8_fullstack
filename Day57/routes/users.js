var express = require('express')
var router = express.Router()
const userController = require('../controllers/user.controller')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})
router.get('/info', userController.info)
router.post('/info', userController.handleChangeInfo)
router.get('/change-password', userController.changePassword)
router.post('/change-password', userController.handleChangePassword)
module.exports = router
