'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('einsatzplan', {
      einsatzplanid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      von: {
        type: Sequelize.DATEONLY
      },
      bis: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.STRING
      },
      userUserid:{
        type:Sequelize.INTEGER,
        referenes:{
          model:'users',
          key:'userid'
        },
        teamteamid:{
          type:Sequelize.INTEGER,
          referenes:{
            model:'teams',
            key:'team'
          }
      
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('einsatzplan');
  }
};