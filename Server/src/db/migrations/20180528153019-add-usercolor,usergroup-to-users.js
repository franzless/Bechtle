'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'usercolor',
      Sequelize.STRING)
  ,
  queryInterface.addColumn(
    'users',
    'usergroup',
    Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'users',
      'usercolor',
      Sequelize.STRING)
  ,
  queryInterface.removeColumn(
    'users',
    'usergroup',
    Sequelize.STRING)
  
  }
};
