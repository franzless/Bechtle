const {users}= require('../db/models')
const {userskills}= require('../db/models')
const config = require('../config/config')



module.exports = {
    getuserskills(req,res){
    
    var u = req.body.userid
     userskills.findAll(
        {where:{
            userUserid:u
        }}
    ).then(r=>{
        var skills= r.map(m=>m.skillSkillid)
        res.send(skills)
    })
    },

    updateuserskills(req,res){
        var data = req.body
        userskills.destroy({
            where:{
                userUserid:data[0].userUserid
            }
        }).then(()=>{
            userskills.bulkCreate(data)
        }).then(()=>{
            res.send({message:'erfolgreich'})
        })
    },
    uploadfiles(req,res){
        var id = req.file.originalname.split(/^[a-zA-Z]+/)[1];
        users.update({
            userimg:req.file.destination+'/'+req.file.filename
        },{where:{
          userid:id  
        }})
        users.findAll({
            where:{
                 userid:id
                }
        })
        .then(r=>{
            res.send(r)
        })
        
    }
    
    }
