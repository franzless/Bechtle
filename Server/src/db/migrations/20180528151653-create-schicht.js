'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('schicht', {
      schichtid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      datum: {
        type: Sequelize.DATEONLY
      },
      schichtname: {
        type: Sequelize.STRING
      },
      userUserid:{
        type:Sequelize.INTEGER,
        referenes:{
          model:'users',
          key:'userid'
        }}
      
      
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('schicht');
  }
};