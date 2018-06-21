'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'users',
      'userimg',
      {
        type: Sequelize.STRING,
        defaultValue: 'http://source.unsplash.com/random/150x150' 
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'users',
      'userimg',
      {
        type: Sequelize.STRING,
        
      }
    )
  }
};
