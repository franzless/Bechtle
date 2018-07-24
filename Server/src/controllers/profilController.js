const {users} = require('../db/models')
const {zeitstempel} = require('../db/models')
const {userskills}= require('../db/models')
const config = require('../config/config')



module.exports = {
    getuserskills(req,res){
    var u= req.body
    userskills.findAll(
        {where:{
            userUserid:u
        }}
    ).then(r=>{
        var skills= r.map(m=>m.skillSkillid)
        res.send(skills)
    })    
    }
   

    }
