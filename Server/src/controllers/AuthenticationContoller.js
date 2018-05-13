const {User} = require('../models')
const jwt = require ('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
const ONE_WEEK = 60*60*24*7
return jwt.sign(user, config.authentication.jwtSecret,{
    expiresIn:ONE_WEEK
})
} 

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
            const {email,password}= req.body
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
                

            })}

            const userJSON = user.toJSON()
           
            res.send({
                user: userJSON,
                token:jwtSignUser(user.toJSON())
            })
                   
           
            
        }catch(err){
            
                res.status(500).send ({
                error:'An error has occured trying to login'
            })
        }
        
    }
}