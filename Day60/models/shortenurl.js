'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ShortenURL extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShortenURL.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      shorten_url: DataTypes.STRING,
      original_url: DataTypes.STRING,
      password: DataTypes.STRING,
      access_times: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      safe_navigation: DataTypes.BOOLEAN,
      user_id: DataTypes.INTEGER,
      qrcode: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'ShortenURL',
      tableName: 'shorten_urls',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  )
  return ShortenURL
}
