'use strict';
import {
  Model
}  from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User,{foreignKey:'FROM',as:'msgSender'})

    }
  }
  Message.init({
    To: DataTypes.INTEGER,
    FROM: DataTypes.INTEGER,
    message: DataTypes.STRING,
    conversationId:DataTypes.INTEGER,
    isDeleted: {type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    deleteBy: {type:DataTypes.BOOLEAN,
      defaultValue:[]
    },
    isRead: {type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};