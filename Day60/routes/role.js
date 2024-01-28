var express = require('express')
var router = express.Router()
const roleController = require('../controllers/role.controller')
/* GET home page. */
router.get('/', roleController.index)
router.get('/:id', (req, res) => {
  res.send(`Role detail page ${req.params.id}`)
})
module.exports = router
