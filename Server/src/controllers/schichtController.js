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
}


}