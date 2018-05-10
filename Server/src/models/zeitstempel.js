module.exports= (sequelize, DataTypes)=>
 sequelize.define('Zeitstempel',{
    Arbeitsbeginn: DataTypes.STRING,      
    ArbeitsEnde:DataTypes.STRING,
    Datum:DataTypes.DATEONLY,
    ArbeitsOrt:DataTypes.STRING,
    createdAt: false,
    updatedAt: false,
    Leistungsschein:{
    type:DataTypes.Integer,
    references:{
        model:Leistungsschein,
        key:'LeistungsscheinID'
    }},
    Serviceleistung:{
        type:DataTypes.Integer,
        references:{
            model:Serviceleistung,
            key:'ServiceleistungID'
        }},
    User:{
        type:DataTypes.Integer,
         references:{
            model:User,
            key:'userid'
        }},
   
    ZeitstempelID:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
    
        
    
})