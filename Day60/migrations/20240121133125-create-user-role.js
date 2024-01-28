'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    })
    await queryInterface.addConstraint('user_role', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_roles_user_id_fk',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    await queryInterface.addConstraint('user_role', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'user_roles_role_id_fk',
      references: {
        table: 'roles',
        field: 'id'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_role')
  }
}
