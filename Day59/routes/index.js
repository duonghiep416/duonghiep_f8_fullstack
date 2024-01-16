var express = require('express')
const mailController = require('../controllers/mail.controller')
var router = express.Router()
const models = require('../models/index')
const Mail = models.Mail
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
