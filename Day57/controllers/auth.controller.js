const model = require('../models/index')
const User = model.User
const Device = model.Device
const bcrypt = require('bcrypt')
var ip = require('ip')
const signUpUtils = require('../utils/signUp.utils')
const { detectBrowser, detectOS } = require('../helpers/detectUser.helper')
module.exports = {
  index: async (req, res, next) => {
    if (!req.session?.user) {
      res.redirect('/auth/sign-in')
      return
    }
    const devices = await Device.findAll({
      where: { ip: ip.address(), status: true }
    })
    if (!devices.length) {
      req.session.destroy()
      res.redirect('/auth/sign-in')
      return
    }
    res.render('index', { title: 'Trang chủ', username: req.session.user })
  },
  signUp: async (req, res) => {
    res.render('auth/signup', {
      title: 'Đăng ký',
      error: req.flash('error')[0],
      dataPrev: null
    })
  },
  handleSignUp: async (req, res) => {
    const { username } = req.body
    if (!signUpUtils.checkValidInfo(req)) {
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
      password: hashedPassword,
      status: true
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
        const browser = detectBrowser(req)
        const os = detectOS(req)
        await Device.create({
          browser: browser.name + ' ' + browser.version,
          os: os.name + ' ' + os.version,
          user_id: user.dataValues.id,
          ip: ip.address(),
          status: true
        })
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
  },
  signOut: async (req, res) => {
    req.session.destroy()
    await Device.update({ status: false }, { where: { ip: ip.address() } })
    res.redirect('/auth/sign-in')
  }
}
