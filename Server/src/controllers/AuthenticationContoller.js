const {User} = require('../models')

module.exports = {
   async register (req,res){
        try {
            const test = await User.create(req.body)
            res.send(test.toJSON())
            
            
        }catch(err){
                res.status(400).send ({
                error:'This email account is already in use.'
            })
        }
        
    },
    async login (req,res){
        try {
            const {email,password}=req.body
            const user = await User.findOne({
                where:{
                    email:email
                }
            })
            if (!user){
                return res.status(403).send({
                  error:'The Login informations were incorrect'  
                })
            }
            const isPasswordValid = password === user.password 
            if(!isPasswordValid){
                return res.status(403).send({
                error:'The Login informations were incorrect'  

            })}

            const userJSON = user.toJSON()
            res.send({
                user: userJSON
            })
                   
           
            
        }catch(err){
                res.status(500).send ({
                error:'An error has occured trying to login'
            })
        }
        
    }
}