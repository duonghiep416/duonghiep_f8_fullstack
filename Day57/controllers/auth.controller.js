const model = require('../models/index')
const User = model.User
const bcrypt = require('bcrypt')
module.exports = {
  index: async (req, res) => {
    if (req.session?.user) {
      res.redirect('/')
      return
    }
    res.render('auth/signin', {
      title: 'Đăng nhập',
      error: req.flash('error')[0]
    })
  },
  signUp: async (req, res) => {
    res.render('auth/signup', {
      title: 'Đăng ký',
      error: req.flash('error')[0],
      dataPrev: null
    })
  },
  handleSignUp: async (req, res) => {
    const { username, password, confirmPassword } = req.body
    if (
      password !== confirmPassword ||
      password.length < 8 ||
      username.length < 5
    ) {
      if (password !== confirmPassword) {
        req.flash('error', 'Mật khẩu nhập lại không khớp')
      }
      if (password.length < 8) {
        req.flash('error', 'Mật khẩu cần tối thiểu 8 kí tự')
      }
      if (username.length < 5) {
        req.flash('error', 'Username cần tối thiểu 5 kí tự')
      }
      res.render('auth/signup', {
        title: 'Đăng kí',
        error: req.flash('error')[0],
        dataPrev: req.body
      })
      return
    }
    const user = await User.findOne({
      where: {
        username
      }
    })
    if (user) {
      req.flash('error', 'Username đã tồn tại, vui lòng nhập username khác')
      res.render('auth/signup', {
        title: 'Đăng kí',
        error: req.flash('error')[0],
        dataPrev: req.body
      })
      return
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword
    })
    if (newUser) {
      req.session.user = username
      res.redirect('/')
      res.render('index', { title: 'Trang chủ', username: newUser.username })
    }
  },
  signIn: async (req, res) => {
    if (req.session?.user) {
      res.redirect('/')
      return
    }
    res.render('auth/signin', {
      title: 'Đăng nhập',
      error: req.flash('error')[0],
      dataPrev: null
    })
  },
  handleSignIn: async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({
      where: {
        username,
        status: true
      }
    })
    if (!user) {
      req.flash('error', 'Tài khoản hoặc mật khẩu không chính xác')
      res.render('auth/signin', {
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
        req.session.user = username
        res.redirect('/')
        res.render('index', { title: 'Trang chủ', username: username })
      } else {
        req.flash('error', 'Tài khoản hoặc mật khẩu không chính xác')
        res.render('auth/signin', {
          title: 'Đăng nhập',
          error: req.flash('error')[0]
        })
        return
      }
    }
  }
}
