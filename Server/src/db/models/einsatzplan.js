'use strict';
module.exports = (sequelize, DataTypes) => {
  var einsatzplan = sequelize.define('einsatzplan', {
    einsatzplanid:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    von: DataTypes.DATEONLY,
    bis: DataTypes.DATEONLY,
    status: DataTypes.STRING
  },  {timestamps:false, freezeTableName: true});
  einsatzplan.associate = function(models) {
    einsatzplan.belongsTo(models.users)
    einsatzplan.belongsTo(models.teams)
  };
  return einsatzplan;
};