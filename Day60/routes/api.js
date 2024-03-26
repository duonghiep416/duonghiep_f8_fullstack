var express = require('express')
var router = express.Router()
const userController = require('../controllers/api/user.controller')
/* GET home page. */
router.get('/users', userController.index)
router.get('/users/:id', userController.find)
router.post('/users', userController.store)

module.exports = router
