const {schicht} = require('../db/models')
const {users} = require('../db/models')

module.exports = {

getschicht(req,res){
    schicht.findAll({
        include:[{
            model:users,
            required:true
        }]
    }).then(result =>{
         res.send(result)
    })
},
updateschichtf(req,res){
    var data = req.body
    schicht.update({
        schichtname:'früh',
        datum:data.datum,
        userUserid:data.userid

    },{where:
        {datum:data.datum}
    }).then(response =>{
        schicht.findAll({
            include:[{
                model:users,
                required:true
            }]
        }).then(result =>{
             res.send(result)
        })      
            
    
    }).catch(err=>{
        res.send(err)
    })
}


}