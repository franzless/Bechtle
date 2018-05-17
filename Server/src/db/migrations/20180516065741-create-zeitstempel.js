'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('zeitstempel', {
      zeitstempelid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      datum:{
        type:Sequelize.DATEONLY
      },
      arbeitsbeginn: {
        type: Sequelize.TIME
      },
      arbeitsende: {
        type: Sequelize.TIME
      },
      leistungsschein: {
        type: Sequelize.STRING
      },
      serviceleistung: {
        type: Sequelize.STRING
      },
      arbeitsort: {
        type: Sequelize.STRING
      },
      userUserid:{
        type:Sequelize.INTEGER,
        referenes:{
          model:'users',
          key:'userid'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('zeitstempel');
  }
};