"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  friend.init(
    {
      sender: DataTypes.INTEGER,
      receiver: DataTypes.INTEGER,
      status: {type:DataTypes.ENUM('unfriend','accepted','pending','blocked','rejected')}
    },
    {
      sequelize,
      modelName: "friend",
    }
  );
  return friend;
};
