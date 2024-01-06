var express = require('express')
var router = express.Router()
const userController = require('../controllers/user.controller')
/* GET home page. */
router.get('/', async function (req, res, next) {
  if (!req.session?.user) {
    res.redirect('/dang-nhap')
    return
  }
  res.render('index', { title: 'Trang chủ', username: req.session.user })
})

router.get('/dang-nhap', userController.index)
router.post('/dang-nhap', userController.handleLogin)
router.get('/dang-xuat', (req, res) => {
  req.session.destroy()
  res.redirect('/dang-nhap')
})
module.exports = router
