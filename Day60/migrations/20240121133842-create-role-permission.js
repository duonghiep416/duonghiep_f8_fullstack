'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_permission', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
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
    await queryInterface.addConstraint('role_permission', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'role_permission_role_id_fk',
      references: {
        table: 'roles',
        field: 'id'
      }
    })
    await queryInterface.addConstraint('role_permission', {
      fields: ['permission_id'],
      type: 'foreign key',
      name: 'role_permission_permission_id_fk',
      references: {
        table: 'permissions',
        field: 'id'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role_permission')
  }
}
