'use strict';
module.exports = (sequelize, DataTypes) => {
  var schicht = sequelize.define('schicht', {
    schichtid:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    datum: DataTypes.DATEONLY,
    schichtname:DataTypes.STRING,
    
      }, {timestamps:false, freezeTableName: true});
  schicht.associate = function(models) {
    schicht.belongsTo(models.users)
  };
  return schicht;
};