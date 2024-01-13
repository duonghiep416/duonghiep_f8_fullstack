const { where } = require('sequelize')
const model = require('../models/index')
const signUpUtils = require('../utils/signUp.utils')
const User = model.User
const Device = model.Device
const bcrypt = require('bcrypt')
var ip = require('ip')

module.exports = {
  info: async (req, res) => {
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
    const user = await User.findOne({
      where: {
        username: req.session?.user
      }
    })
    res.render('user/info', {
      title: 'Thông tin tài khoản',
      user,
      error: req.flash('error')[0]
    })
  },

  handleChangeInfo: async (req, res) => {
    const { username } = req.body
    if (!signUpUtils.checkValidInfo(req)) {
      res.render('user/info', {
        title: 'Thông tin tài khoản',
        user: { username },
        error: req.flash('error')[0]
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
      res.render('user/info', {
        title: 'Thông tin tài khoản',
        user,
        error: req.flash('error')[0]
      })
      return
    }
    try {
      await User.update(
        { username },
        { where: { username: req.session?.user } }
      )
      res.render('user/info', {
        title: 'Thông tin tài khoản',
        user: { username },
        error: 'Đổi thông tin người dùng thành công'
      })
    } catch (error) {
      res.render('user/info', {
        title: 'Thông tin tài khoản',
        user: { username },
        error: 'Có lỗi xảy ra'
      })
    }
  },

  changePassword: async (req, res) => {
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
    res.render('user/changePassword', {
      title: 'Đổi mật khẩu',
      error: null
    })
  },

  handleChangePassword: async (req, res) => {
    const { oldPassword, password } = req.body
    if (!signUpUtils.checkValidInfo(req)) {
      res.render('user/changePassword', {
        title: 'Đổi mật khẩu',
        error: req.flash('error')[0]
      })
      return
    }
    if (password === oldPassword) {
      req.flash('error', 'Mật khẩu mới không được trùng với mật khẩu cũ')
      res.render('user/changePassword', {
        title: 'Đổi mật khẩu',
        error: req.flash('error')[0]
      })
      return
    }
    const user = await User.findOne({
      where: {
        username: req.session?.user
      }
    })
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      req.flash('error', 'Mật khẩu cũ không chính xác')
      res.render('user/changePassword', {
        title: 'Đổi mật khẩu',
        error: req.flash('error')[0]
      })
      return
    }
    await User.update(
      { password: await bcrypt.hash(password, 10) },
      { where: { username: req.session?.user } }
    )

    await Device.update(
      { status: false },
      { where: { user_id: user.dataValues.id } }
    )
    req.flash('error', 'Đổi mật khẩu thành công')
    res.render('user/changePassword', {
      title: 'Đổi mật khẩu',
      error: req.flash('error')[0]
    })
  }
}
