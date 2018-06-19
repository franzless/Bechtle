'use strict';
module.exports = (sequelize, DataTypes) => {
  var teams = sequelize.define('teams', {
    teamid:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    teamname: DataTypes.STRING
  }, {timestamps:false, freezeTableName: true});
  teams.associate = function(models) {
    // associations can be defined here
  };
  return teams;
};