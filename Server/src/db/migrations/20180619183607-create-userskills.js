'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('userskills', {
      userUserid:{
        type:Sequelize.INTEGER,
        unique: 'compositeIndex',
        referenes:{
          model:'users',
          key:'userid'
        }},
        skillskillid:{
          type:Sequelize.INTEGER,
          unique: 'compositeIndex',
          referenes:{
            model:'skills',
            key:'skillid'
          }}
      
  })},
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('userskills');
  }
};