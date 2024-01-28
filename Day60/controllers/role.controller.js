const models = require('../models/index')
const { Role } = models
module.exports = {
  index: async (req, res) => {
    const roles = await Role.findAll()
    console.log(roles)
  }
}
