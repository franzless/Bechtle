const {einsatzplan} = require('../db/models')
const {teams} = require('../db/models')
const {users} = require('../db/models')
const {skills} = require('../db/models')
const {userskills} = require('../db/models')
const {sequelize} =require ('../db/models')

module.exports = {
    queryusers(req,res){
        var l = req.body.length
        
        switch(l){
            case 1:
            userskills.findAll(
                {where:{
                    skillskillid:req.body[0]
                }}).then(users=>{
                    res.send(users)
                }
            )
            break;
            case 2:
            sequelize.query("SELECT * FROM userskills WHERE skillSkillid = ? AND userUserid IN(SELECT userUserid from userskills where skillSkillid = ?)",
        {replacements:[req.body[0],req.body[1]],type:sequelize.QueryTypes.SELECT})
            .then((results =>{
                res.send(results)
                console.log(results)
            }))
            break;
            case 3:
            sequelize.query("SELECT * FROM userskills WHERE skillSkillid = ? AND userUserid IN(SELECT userUserid from userskills where skillSkillid = ? AND userUserid IN(select userUserid from userskills where skillSkillid = ?))",
        {replacements:[req.body[0],req.body[1], req.body[2]],type:sequelize.QueryTypes.SELECT})
            .then((results =>{
                res.send(results)
            }))
            break;
            
            default:
            res.send({Error:'Too many Criterias'})
        }
    },
    getkärcher(req,res){
        einsatzplan.findAll(
            {
                include:[{model:users,required:true},
                        {model:teams,required:true}]
                
            ,  where:{
                teamTeamid:1
            }}
            )
        .then(result =>{
            res.send(result)
        })
    },
    getmhp(req,res){
        einsatzplan.findAll(
            {
                include:[{model:users,required:true},
                        {model:teams,required:true}]
                
            ,  where:{
                teamTeamid:2
            }}
            )
        .then(result =>{
            res.send(result)
        })
    },
    getheller(req,res){
        einsatzplan.findAll(
            {
                include:[{model:users,required:true},
                        {model:teams,required:true}]
                
            ,  where:{
                teamTeamid:3
            }}
            )
        .then(result =>{
            res.send(result)
        })
    },
    getbenz(req,res){
        einsatzplan.findAll(
            {
                include:[{model:users,required:true},
                        {model:teams,required:true}]
                
            ,  where:{
                teamTeamid:4
            }}
            )
        .then(result =>{
            res.send(result)
        })
    },
    getteams(req,res){
        teams.findAll()
        .then(result =>{
            res.send(result)
        })},
    getskills(req,res){
            skills.findAll()
            .then(result =>{
                res.send(result)
            })},
    update(req,res){
        var data = req.body
        einsatzplan.update({
            einsatzplanid:data.einsatzplanid,
            userUserid:data.userUserid,
            teamTeamid:data.teamTeamid,
            status:data.status,
            von:data.von,
            bis:data.bis
    
        },{where:
            {einsatzplanid:data.einsatzplanid}})
            .then(response =>{
              res.send(response)
               })
            .catch(err=>{
                res.send(err)
            })
},
getuserskills(req,res){
    userskills.findAll()
    .then(result =>{
        res.send(result)
    })},} 