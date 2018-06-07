'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'userimg',
      Sequelize.STRING)
  ,
  queryInterface.addColumn(
    'zeitstempel',
    'pause',
    Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'users',
      'userimg',
      Sequelize.STRING)
  ,
  queryInterface.removeColumn(
    'zeitstempel',
    'pause',
    Sequelize.STRING)
  
  }
};
