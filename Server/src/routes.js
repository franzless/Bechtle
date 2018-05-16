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
        const zs = zeitstempel.findAll()   
    }),

    app.post('/db/zeitstempel', function(req,res){
        AuthenticationController.zeitstempel
    }

    
)
            
}        
        
      

