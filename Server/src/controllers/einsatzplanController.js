const {einsatzplan} = require('../db/models')
const {teams} = require('../db/models')

module.exports = {
    getall(req,res){
        einsatzplan.findAll()
        .then(result =>{
            res.send(result)
        })
    },
    getteams(req,res){
        teams.findAll()
        .then(result =>{
            res.send(result)
        })}
}