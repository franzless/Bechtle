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
        
    }
}