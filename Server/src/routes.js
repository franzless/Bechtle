const AuthenticationController = require ('./controllers/AuthenticationContoller.js')
const {zeitstempel} = require('./db/models')
module.exports = (app) => {
    app.post('/register', 
        AuthenticationController.register
          
        ),
    app.post('/login', 
        AuthenticationController.login
      
    ),
    app.get('/db/main', function(req,res){
        zeitstempel.findAll().then(zeitstempel =>{
            res.send(zeitstempel)
        })
        
           
        
        
            
        
    }),

    app.post('/db/zeitstempel', function(req, res){
        zeitstempel.create(req.body)
        .then(zeitstempel => {
            res.send(zeitstempel)
        })
        .catch(error =>{
        throw error;
        })
        
    }

    
)
            
}        
        
      

