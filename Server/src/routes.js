const AuthenticationController = require ('./controllers/AuthenticationContoller.js')
const {zeitstempel} = require('./db/models')
module.exports = (app) => {
    app.post('/register', 
        AuthenticationController.register
          
        ),
    app.post('/login', 
        AuthenticationController.login
      
    ),
    app.post('/db/main', function(req,res){
        console.log(req.body.userid)
        const userid = req.body.userid
        
        zeitstempel.findAll(
            {where:{
                userUserid:userid
            }}
        ).then(zeitstempel =>{
            res.send(zeitstempel)
        })
       .catch(error =>{
       console.log (error) })
        
          
        
        
            
        
    }),

    app.post('/db/zeitstempel', function(req, res){
        console.log(req.body)
        zeitstempel.create(req.body)
        .then(zeitstempel => {
            res.send(zeitstempel)
        })
        .catch(error =>{
         console.log (error);
        })
        
    }

    
)
            
}        
        
      

