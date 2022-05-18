'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.renameColumn('Users','firstName','fullName'
    )
  },

  async down (queryInterface, Sequelize) {
    // queryInterface.removeColumn('Users','otp'
    // )
  }
};