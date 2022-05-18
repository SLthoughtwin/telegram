'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Users','otp',Sequelize.INTEGER
    )
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users','otp'
    )
  }
};
