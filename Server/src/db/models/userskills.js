'use strict';
module.exports = (sequelize, DataTypes) => {
  var userskills = sequelize.define('userskills',{},
  {timestamps:false, freezeTableName: true});
  userskills.associate = function(models) {
    models.users.belongsToMany(models.skills, { through: userskills });
    models.skills.belongsToMany(models.users, { through: userskills });
  };
  return userskills;
};