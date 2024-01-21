const crypto = require('crypto')
const temporaryLinks = new Map()
const sendMail = require('../utils/mail')
const { User } = require('../models/index')
const bcrypt = require('bcrypt')
module.exports = {
  login: (req, res, next) => {
    const error = req.flash('error')
    res.render('auth/login', { title: 'Đăng nhập', error })
  },
  register: (req, res, next) => {
    res.render('auth/register', { title: 'Đăng kí' })
  },
  forgotPassword: (req, res, next) => {
    res.render('auth/forgotPassword', { title: 'Quên mật khẩu' })
  },
  handleForgotPassword: async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.send('Email không tồn tại')
    } else if (user.provider_id !== null) {
      return res.send(
        'Bạn đã đăng ký tài khoản bằng Google, vui lòng đăng nhập bằng Google'
      )
    } else if (!user.status) {
      return res.send('Tài khoản của bạn đã bị khóa')
    }
    const token = crypto.randomBytes(16).toString('hex')
    const expirationTime = Date.now() + 15 * 60 * 1000
    temporaryLinks.set(token, expirationTime)
    const link = `https://day60.vercel.app/auth/reset-password/${token}/${email}`
    const info = await sendMail(req.body.email, 'Reset password', link)
    return res.send('Vui lòng kiểm tra email để đặt lại mật khẩu')
  },
  resetPassword: (req, res, next) => {
    const { token, email } = req.params
    const expirationTime = temporaryLinks.get(token)
    if (expirationTime && expirationTime > Date.now()) {
      return res.render('auth/resetPassword', {
        title: 'Đặt lại mật khẩu',
        error: ''
      })
    } else {
      return res.send('Liên kết hết hạn hoặc không tồn tại')
    }
  },
  handleResetPassword: async (req, res, next) => {
    const { email, token } = req.params
    const { password, confirmPassword } = req.body
    if (password.length < 6) {
      req.flash('error', 'Mật khẩu phải có ít nhất 6 kí tự')
      return res.render('auth/resetPassword', {
        error: req.flash('error')[0],
        title: 'Đặt lại mật khẩu'
      })
    }
    if (password !== confirmPassword) {
      req.flash('error', 'Mật khẩu nhập lại không trùng khớp')
      return res.render('auth/resetPassword', {
        error: req.flash('error')[0],
        title: 'Đặt lại mật khẩu'
      })
    }
    const user = await User.findOne({ where: { email } })
    const comparePassword = bcrypt.compareSync(password, user.password)
    if (comparePassword) {
      req.flash('error', 'Mật khẩu mới không được trùng với mật khẩu cũ')
      return res.render('auth/resetPassword', {
        error: req.flash('error')[0],
        title: 'Đặt lại mật khẩu'
      })
    }
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const expirationTime = temporaryLinks.get(token)
    if (expirationTime && expirationTime > Date.now()) {
      await User.update(
        {
          password: hashedPassword
        },
        {
          where: {
            email
          }
        }
      )
      temporaryLinks.delete(token)
      return res.redirect('/auth/login')
    } else {
      return res.send('Liên kết hết hạn hoặc không tồn tại, vui lòng thử lại')
    }
  }
}
