const {users} = require('../db/models')
const {zeitstempel} = require('../db/models')
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
            const test = await users.create(req.body)
            res.send(test.toJSON())
            
            
        }catch(err){
                res.status(400).send ({
                error:'This email account is already in use.'
            })
        }
        
    },
    async zeitstempel (req,res){
        try {
            const zeit = await zeitstempel.create(req.body)
            console.log(zeit)
            res.send(zeit.toJSON())
            
            
        }catch(err){
                res.status(404).send ({
                error:'blubb'
            })
        }
        
    },
    async login (req,res){
        try {
            const {email,password}= req.body
            const user = await users.findOne({
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