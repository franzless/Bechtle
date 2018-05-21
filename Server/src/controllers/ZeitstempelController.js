const {zeitstempel} = require('../db/models')

module.exports = {

    updatezeitstempel (req,res) {
        zeitstempel.update(
          {datum:req.body.datum,
           arbeitsbeginn:req.body.arbeitsbeginn,
           arbeitsende:req.body.arbeitsende,
           arbeitsort:req.body.arbeitsort,
           leistungsschein:req.body.leistungsschein,
           serviceleistung:req.body.serviceleistung
        },{where:
            {zeitstempelid:req.body.zeitstempelid}}  
        ).then(result =>{
            res.send('done')
        })
    },
    getall(req,res){
        const userid = req.body.userid
        
        zeitstempel.findAll(
            {where:{
                userUserid:userid
            }}
        ).then(zeitstempel =>{
            res.send(zeitstempel)
        })
       .catch(error =>{
       console.log (error)
    })},
    addnew(req,res){
        zeitstempel.create(req.body)
        .then(zeitstempel => {
            res.send(zeitstempel)
        })
        .catch(error =>{
         console.log (error);
        })
    },
    deleterecord(req,res){
        console.log(req.body)
        const zeitid = req.body[0].zeitstempelid
        zeitstempel.destroy({
            where:{
                zeitstempelid:zeitid
            }
        })}
    

}