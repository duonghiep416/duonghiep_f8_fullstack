const { User } = require('../../models/index')
const { Op } = require('sequelize')
const { object, string } = require('yup')
module.exports = {
  index: async (req, res) => {
    const { sort = 'id', order = 'asc', status, q, limit, page = 1 } = req.query
    const filters = {}
    if (status === 'true' || status === 'false') {
      filters.status = status
    }
    if (q) {
      filters[Op.or] = {
        name: {
          [Op.iLike]: `%${q.trim()}%`
        },
        email: {
          [Op.iLike]: `%${q.trim()}%`
        }
      }
    }
    const option = {
      order: [[sort, order]],
      where: filters,
      attributes: { exclude: ['password'] }
    }
    if (limit && Number.isInteger(+limit)) {
      option.limit = +limit
      option.offset = (page - 1) * limit
    }
    const response = {}
    try {
      const { count, rows: users } = await User.findAndCountAll(option)
      response.status = 200
      response.message = 'Success'
      response.data = users
      response.pagination = {
        _limit: limit,
        _page: page,
        _totalRows: count
      }
    } catch (error) {
      response.status = 500
      response.message = 'Server ERROR'
    }
    res.status(response.status).json(response)
  },
  find: async (req, res) => {
    const { id } = req.params
    const response = {}
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      })
      if (!user) {
        Object.assign(response, {
          status: 404,
          message: 'Not Found'
        })
      } else {
        Object.assign(response, {
          status: 200,
          message: 'Success',
          data: user
        })
      }
    } catch (error) {
      response.status = 500
      response.message = 'Server ERROR'
    }
    res.status(response.status).json(response)
  },
  store: async (req, res) => {
    const schema = object({
      name: string().required('Tên bắt buộc nhập'),
      email: string()
        .email('Email không hợp lệ')
        .required('Email bắt buộc nhập'),
      password: string().required('Mật khẩu bắt buộc nhập'),
      status: string()
        .required('Trạng thái bắt buộc nhập')
        .test('check-boolean', 'Trạng thái không hợp lệ', (value) => {
          return value === 'true' || value === 'false'
        })
    })
    const response = {}
    try {
      const body = await schema.validate(body, {
        abortEarly: false
      })
      body.status = body.status === 'true'
      const user = await User.create()
      Object.assign(response, {
        status: 200,
        message: 'Success',
        data: user
      })
    } catch (error) {
      const errors = Object.fromEntries(
        error.inner.map(({ path, message }) => [path, message])
      )
      Object.assign(response, {
        status: 400,
        message: 'Bad Request',
        errors
      })
    }
    res.json(response)
  }
}
