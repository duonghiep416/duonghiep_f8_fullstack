const { object, string } = require('yup')
const models = require('../models/index')
const { ShortenURL } = models
const crypto = require('crypto')
const moment = require('moment')
const createQRcode = require('../utils/qrcode')
const validationSchema = object().shape({
  original_url: string()
    .url('Vui lòng nhập một URL hợp lệ')
    .required('URL là bắt buộc'),
  password: string().min(5, 'Mật khẩu phải có ít nhất 5 ký tự').nullable(),
  id_url: string()
    .matches(/^[a-zA-Z0-9]+$/, 'ID chỉ có thể chứa chữ cái và số')
    .nullable()
})
module.exports = {
  index: async (req, res, next) => {
    const shortenUrls = await ShortenURL.findAll({
      order: [['created_at', 'DESC']],
      where: {
        user_id: req.user.id
      }
    })
    res.render('shorten-url/index', {
      layout: 'shorten-url/layout',
      shortenUrls,
      edit: false,
      error: req.flash('errors')[0],
      moment
    })
  },
  create: async (req, res, next) => {
    let { original_url, password, safe_navigation, id_url } = req.body
    if (!password) {
      password = null
    }
    if (!id_url) {
      id_url = null
    }
    if (!safe_navigation) {
      safe_navigation = false
    } else {
      safe_navigation = true
    }

    try {
      await validationSchema.validate({
        original_url,
        password,
        id_url
      })
      let shorten_url
      if (id_url) {
        shorten_url = `${process.env.BASE_URL}/shorten-url/${id_url}`
        const checkUnique = await ShortenURL.findOne({
          where: {
            shorten_url
          }
        })
        if (checkUnique) {
          req.flash('errors', 'Đường dẫn đã tồn tại')
          return res.redirect('/shorten-url')
        }
      } else {
        const token = crypto.randomBytes(8).toString('hex')
        shorten_url = `${process.env.BASE_URL}/shorten-url/${token}`
      }
      const qrcode = await createQRcode(shorten_url)
      await ShortenURL.create({
        shorten_url,
        original_url,
        password,
        safe_navigation,
        qrcode,
        user_id: req.user.id
      })
      res.redirect('/shorten-url')
    } catch (error) {
      req.flash('errors', error.message)
      res.redirect('/shorten-url')
    }
  },
  redirect: async (req, res, next) => {
    const id = req.params.id
    const url = await ShortenURL.findOne({
      where: {
        shorten_url: `${process.env.BASE_URL}/shorten-url/${id}`
      }
    })
    if (!url) {
      return res.send('URL không tồn tại')
    }
    url.access_times += 1
    await url.save()
    if (url.password) {
      return res.render('shorten-url/redirectPassword', {
        layout: 'shorten-url/layout',
        url,
        error: null
      })
    }
    if (url.safe_navigation) {
      return res.render('shorten-url/redirect', {
        layout: 'shorten-url/layout',
        url
      })
    }
    res.redirect(url.original_url)
  },
  handleRedirectPassword: async (req, res, next) => {
    const { id } = req.params
    const { password } = req.body
    const url = await ShortenURL.findOne({
      where: {
        shorten_url: `${process.env.BASE_URL}/shorten-url/${id}`
      }
    })
    if (!url) {
      return res.send('URL không tồn tại')
    }
    if (url.password !== password) {
      return res.render('shorten-url/redirectPassword', {
        layout: 'shorten-url/layout',
        url,
        error: 'Mật khẩu không đúng'
      })
    }
    if (url.safe_navigation) {
      return res.render('shorten-url/redirect', {
        layout: 'shorten-url/layout',
        url
      })
    }
    res.redirect(url.original_url)
  },
  edit: async (req, res, next) => {
    const id = req.params.id
    const shortenUrls = await ShortenURL.findAll({
      order: [['created_at', 'DESC']],
      where: {
        user_id: req.user.id
      }
    })
    const urlEdit = await ShortenURL.findOne({
      where: {
        id
      }
    })
    if (!urlEdit) {
      return res.send('URL không tồn tại')
    }
    res.render('shorten-url/index', {
      layout: 'shorten-url/layout',
      edit: true,
      urlEdit,
      shortenUrls,
      moment,
      error: req.flash('errors')[0]
    })
  },
  handleEdit: async (req, res, next) => {
    const { id } = req.params
    let { id_url } = req.body
    const url = await ShortenURL.findOne({
      where: {
        id
      }
    })
    if (!url) {
      return res.send('URL không tồn tại')
    }
    if (id_url) {
      const checkUnique = await ShortenURL.findOne({
        where: {
          shorten_url: `${process.env.BASE_URL}/shorten-url/${id_url}`
        }
      })
      if (checkUnique) {
        req.flash('errors', 'ID đã tồn tại')
        return res.redirect('/shorten-url/edit/' + id)
      }
      const shorten_url = `${process.env.BASE_URL}/shorten-url/${id_url}`
      url.shorten_url = shorten_url
      const qrcode = await createQRcode(shorten_url)
      url.qrcode = qrcode
    }
    await url.save()
    res.redirect('/shorten-url')
  },
  delete: async (req, res, next) => {
    const { id } = req.params
    const url = await ShortenURL.findOne({
      where: {
        id
      }
    })
    if (!url) {
      return res.send('URL không tồn tại')
    }
    await url.destroy()
    res.redirect('/shorten-url')
  }
}
