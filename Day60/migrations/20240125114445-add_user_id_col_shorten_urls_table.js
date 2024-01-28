'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('shorten_urls', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('shorten_urls', 'user_id')
  }
}
