'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('shorten_urls', 'safe_navigation', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('shorten_urls', 'safe_navigation')
  }
}
