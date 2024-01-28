'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permission.belongsToMany(models.Role, {
        through: 'role_permission',
        as: 'roles',
        foreignKey: 'permission_id'
      })
      Permission.belongsToMany(models.User, {
        through: 'users_permissions',
        as: 'users',
        foreignKey: 'permission_id'
      })
    }
  }
  Permission.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      value: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Permission',
      tableName: 'permissions',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return Permission
}
