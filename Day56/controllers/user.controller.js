const model = require('../models/index')
const User = model.User
const bcrypt = require('bcrypt')

module.exports = {
  index: async (req, res) => {
    // const hashedPassword = await bcrypt.hash('hoclaptrinh', 10)
    // const hashedPassword = await bcrypt.hash('hello@abc', 10)
    // console.log(hashedPassword)
    // const passwordMatch = await bcrypt.compare(
    //   'hoclaptrinh123',
    //   '$2b$10$bTHpX/u7VCXv6F5feYtVnuMvIBSH7uynqunnsPABYlJXv1nfHLlfG'
    // )
    if (req.session?.user) {
      res.redirect('/')
      return
    }
    res.render('login', { title: 'Đăng nhập', error: req.flash('error')[0] })
  },
  handleLogin: async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({
      where: {
        username
      }
    })
    if (!user) {
      req.flash('error', 'Tài khoản hoặc mật khẩu không chính xác')
      res.render('login', {
        title: 'Đăng nhập',
        error: req.flash('error')[0]
      })
      return
    } else {
      const passwordMatch = await bcrypt.compare(
        password,
        user.dataValues.password
      )
      if (passwordMatch) {
        req.session.user = user.dataValues.username
        res.redirect('/')
        res.render('index', { title: 'Trang chủ', username: req.session.user })
      } else {
        req.flash('error', 'Tài khoản hoặc mật khẩu không chính xác')
        res.render('login', {
          title: 'Đăng nhập',
          error: req.flash('error')[0]
        })
        return
      }
    }
  }
}
