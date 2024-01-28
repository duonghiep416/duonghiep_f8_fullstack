'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_permissions', {
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
      permission_id: {
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
    await queryInterface.addConstraint('users_permissions', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'users_permissions_user_id_fk',
      references: {
        table: 'users',
        field: 'id'
      }
    })
    await queryInterface.addConstraint('users_permissions', {
      fields: ['permission_id'],
      type: 'foreign key',
      name: 'users_permissions_permission_id_fk',
      references: {
        table: 'permissions',
        field: 'id'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_permissions')
  }
}
