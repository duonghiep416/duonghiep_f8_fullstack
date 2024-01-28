'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Provider, {
        foreignKey: 'provider_id',
        as: 'provider'
      })
      User.belongsToMany(models.Role, {
        through: 'user_role',
        as: 'roles',
        foreignKey: 'user_id'
      })
      User.belongsToMany(models.Permission, {
        through: 'users_permissions',
        as: 'permissions',
        foreignKey: 'user_id'
      })
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return User
}
