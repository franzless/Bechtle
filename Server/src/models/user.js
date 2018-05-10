module.exports= (sequelize, DataTypes)=>
 sequelize.define('User',{
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    password:DataTypes.STRING,
    firstname:DataTypes.STRING,
    lastname:DataTypes.STRING,
    userid:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
        
    }
})