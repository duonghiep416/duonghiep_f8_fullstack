'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users_permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users_permissions.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      Users_permissions.belongsTo(models.Permission, {
        foreignKey: 'permission_id'
      })
    }
  }
  Users_permissions.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: DataTypes.INTEGER,
      permission_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Users_permissions',
      tableName: 'users_permissions',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return Users_permissions
}
