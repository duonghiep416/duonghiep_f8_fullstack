'use strict'
const bcrypt = require('bcrypt')
const { faker } = require('@faker-js/faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = []
    const salt = bcrypt.genSaltSync(10)
    for (let i = 0; i < 100; i++) {
      data.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('123456', salt),
        status: true,
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    await queryInterface.bulkInsert('users', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
