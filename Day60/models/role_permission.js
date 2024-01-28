'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Role_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role_permission.belongsTo(models.Role, {
        foreignKey: 'role_id'
      })
      Role_permission.belongsTo(models.Permission, {
        foreignKey: 'permission_id'
      })
    }
  }
  Role_permission.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      role_id: DataTypes.INTEGER,
      permission_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Role_permission',
      tableName: 'role_permission',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return Role_permission
}
