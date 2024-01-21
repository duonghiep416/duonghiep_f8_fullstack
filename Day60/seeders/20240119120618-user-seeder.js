'use strict'
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = []
    const salt = bcrypt.genSaltSync(10)
    data.push({
      name: 'Dương Hiệp',
      email: 'duonghiep416@gmail.com',
      password: bcrypt.hashSync('123456', salt),
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    })
    await queryInterface.bulkInsert('users', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
