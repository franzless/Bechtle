const {einsatzplan} = require('../db/models')
const {teams} = require('../db/models')
const {users} = require('../db/models')
const {skills} = require('../db/models')
const {userskills} = require('../db/models')

module.exports = {
    queryusers(req,res){
        console.log(req.body)
        var l = req.body.length
        console.log(l)
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