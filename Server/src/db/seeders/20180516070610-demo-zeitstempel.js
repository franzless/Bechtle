'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('zeitstempel', [{
        datum:'2018-05-16',
        arbeitsende:'08:30',
        arbeitsende:'16:45',
        leistungsschein:'rollout',
        serviceleistung:'Techniker',
        arbeitsort:'kärcher',
        userid:1
        
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
