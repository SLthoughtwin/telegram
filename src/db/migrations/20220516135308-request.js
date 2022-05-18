'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.addColumn('friends','isBlock',Sequelize.BOOLEAN
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('friends','isBlock' )
  }
};