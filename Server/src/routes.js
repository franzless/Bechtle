const AuthenticationController = require ('./controllers/AuthenticationContoller.js')
const ZeitstempelController = require ('./controllers/ZeitstempelController.js')
const {zeitstempel} = require('./db/models')
module.exports = (app) => {
    app.post('/register', 
        AuthenticationController.register
          
        ),
    app.post('/login', 
        AuthenticationController.login
      
    ),
    app.post('/db/main', 
        ZeitstempelController.getall
         )
    app.post('/db/zeitstempel/update',
        ZeitstempelController.updatezeitstempel
    ),      
    

    app.post('/db/zeitstempel', 
        ZeitstempelController.addnew),
    
    app.post('db/zeitstempel/del',
        ZeitstempelController.deleterecord)
        
    

            
}        
        
      

