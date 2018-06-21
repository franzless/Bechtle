'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    userimg:
    {type:DataTypes.STRING,
     defaultValue: 'http://source.unsplash.com/random/150x150' 
    },
    userid:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    usercolor:DataTypes.STRING,
    usergroup:DataTypes.STRING
  }, {timestamps:true, freezetableNames:true});
  users.associate = function(models) {
    // associations can be defined here
    
  };
  return users;
};