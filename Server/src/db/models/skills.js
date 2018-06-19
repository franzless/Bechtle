'use strict';
module.exports = (sequelize, DataTypes) => {
  var skills = sequelize.define('skills', {
    skillid:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    skillname: DataTypes.STRING
  }, {timestamps:false, freezeTableName: true});
  skills.associate = function(models) {
    // associations can be defined here
  };
  return skills;
};