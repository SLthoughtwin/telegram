"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("friends", "status", {
      type: Sequelize.ENUM(
        "unfriend",
        "accepted",
        "pending",
        "blocked",
        "rejected"
      ),
      allowNull:false,
      defaultValue:'pending'
    });
  },

  async down(queryInterface, Sequelize) {
    // queryInterface.removeColumn('Users','otp'
    // )
  },
};
