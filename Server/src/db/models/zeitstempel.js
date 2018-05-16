'use strict';
module.exports = (sequelize, DataTypes) => {
  var zeitstempel = sequelize.define('zeitstempel', {
    datum:DataTypes.DATEONLY,
    arbeitsbeginn: DataTypes.TIME,
    arbeitsende: DataTypes.TIME,
    leistungsschein: DataTypes.STRING,
    serviceleistung: DataTypes.STRING,
    arbeitsort: DataTypes.STRING,
    zeitstempelid:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  }, {timestamps:false,freezetableName:true});
  zeitstempel.associate = function(models) {
    // associations can be defined here
    zeitstempel.belongsTo(models.users)
  }
  return zeitstempel;
};