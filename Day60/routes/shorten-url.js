var express = require('express')
var router = express.Router()
const shortenUrlController = require('../controllers/shortUrl.controller')
const authMiddleware = require('../middlewares/auth.middleware')
/* GET home page. */
router.get('/', shortenUrlController.index)
router.post('/', shortenUrlController.create)
router.get('/:id', shortenUrlController.redirect)
router.post('/:id', shortenUrlController.handleRedirectPassword)
router.get('/edit/:id', shortenUrlController.edit)
router.post('/edit/:id', shortenUrlController.handleEdit)
router.get('/delete/:id', shortenUrlController.delete)
module.exports = router
