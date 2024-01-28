const models = require('../models/index')
const { User } = models
module.exports = {
  index: async (req, res) => {
    const users = await User.findAll()
    res.render('user/index', { users })
  }
}
