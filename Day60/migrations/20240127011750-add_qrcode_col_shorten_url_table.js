'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('shorten_urls', 'qrcode', {
      type: Sequelize.TEXT
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('shorten_urls', 'qrcode')
  }
}
