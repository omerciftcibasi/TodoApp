'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.renameColumn('Todos', 'todoItem', 'title');
     await queryInterface.renameColumn('Users', 'fullName', 'name');
     await queryInterface.renameColumn('RefreshTokens', 'token', 'refreshToken');

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.renameColumn('Todos', 'title', 'todoItem');
     await queryInterface.renameColumn('Users', 'fullName', 'name');
     await queryInterface.renameColumn('Users', 'refreshToken', 'token');

  }
};
