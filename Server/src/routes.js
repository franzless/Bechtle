const AuthenticationController = require ('./controllers/AuthenticationContoller.js')
module.exports = (app) => {
    app.post('/register', 
        AuthenticationController.register
          
        ),
    app.post('/login', 
        AuthenticationController.login
      
    )
}