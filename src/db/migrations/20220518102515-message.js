"use strict";

const sequelize = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Messages", "deleteBy")
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Messages", "deleteBy", {
      type: Sequelize.ARRAY( Sequelize.INTEGER),
      defaultValue:[]
    });
  },
};
