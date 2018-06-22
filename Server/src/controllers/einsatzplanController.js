const {einsatzplan} = require('../db/models')
const {teams} = require('../db/models')
const {users} = require('../db/models')
const {skills} = require('../db/models')

module.exports = {
    getall(req,res){
        einsatzplan.findAll(
            {
                include:[{model:users,required:true},
                        {model:teams,required:true}]
            }
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
            useruserid:data.useruserid,
            teamteamid:data.teamteamid,
            status:data.status,
            von:data.von,
            bis:data.bis
    
        },{where:
            {einsatzlanid:data.einsatzplanid}
            .then(reponse =>{
                getall()
            .then(r=>{
                res.send(r)
            
            })})
})}}  