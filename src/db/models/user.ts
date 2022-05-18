'use strict';
import {
  INTEGER,
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      User.hasMany(models.Message,{foreignKey:'FROM'})
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isActive: {type:DataTypes.BOOLEAN,
    defaultValue:true},
    otp:DataTypes.INTEGER,
    isVerified: {type:DataTypes.BOOLEAN,
      defaultValue:false},
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};