'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_role.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      User_role.belongsTo(models.Role, {
        foreignKey: 'role_id'
      })
    }
  }
  User_role.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: DataTypes.INTEGER,
      role_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'User_role',
      tableName: 'user_role',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return User_role
}
