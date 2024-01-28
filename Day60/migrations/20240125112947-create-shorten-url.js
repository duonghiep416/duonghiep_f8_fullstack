'use strict'

const { de } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shorten_urls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shorten_url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      original_url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      access_times: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shorten_urls')
  }
}
