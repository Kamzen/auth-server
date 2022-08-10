'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({

    firstName: {type : DataTypes.STRING, allowNull : false},
      lastName: {type : DataTypes.STRING, allowNull : false},
      email: {type : DataTypes.STRING, allowNull : false},
      password : {type : DataTypes.STRING, allowNull : false},
      type : {type : DataTypes.STRING, allowNull : false},
      username : {type : DataTypes.STRING, allowNull : false},

  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      afterCreate: (record) => {
          delete record.dataValues.password;
          delete record.dataValues.updatedAt;
          delete record.dataValues.createdAt;

      },
      afterUpdate: (record) => {
          delete record.dataValues.password;
          delete record.dataValues.updatedAt;
          delete record.dataValues.createdAt;
      },
  }
  });
  return User;
};