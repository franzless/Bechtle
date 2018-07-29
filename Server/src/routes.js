const AuthenticationController = require ('./controllers/AuthenticationContoller.js')
const ZeitstempelController = require ('./controllers/ZeitstempelController.js')
const schichtController = require ('./controllers/schichtController.js')
const einsatzplanController = require ('./controllers/einsatzplanController.js')
const profilController = require ('./controllers/profilController.js')
const {zeitstempel} = require('./db/models')
var multer  = require('multer')
const {users} = require('./db/models')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assets/userimages')
      },    
    filename: function (req, file, cb) {
        var extension= file.mimetype.split('/')
      cb(null, file.originalname+'.'+extension[1])
    }
  })
var upload = multer({ storage:storage})

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
    app.get('/users',
        AuthenticationController.getall
    ),

    app.post('/db/zeitstempel', 
        ZeitstempelController.addnew),
    
    app.post('/db/zeitstempel/del',
        ZeitstempelController.deleterecord),

    app.get('/db/schicht',
        schichtController.getschicht
        ),
    app.post('/db/updateschichtf',
        schichtController.updateschichtf)
        ,
    app.post('/db/addschicht',
        schichtController.addschicht),

    app.post('/db/filter',
        ZeitstempelController.filter),

    app.post('/zeitstempel/krank',
        ZeitstempelController.krank),

    app.get('/db/einsatzlanung/getkaercher',
        einsatzplanController.getkärcher
        ),
    app.get('/db/einsatzlanung/getteams',
        einsatzplanController.getteams),
        
    app.get('/db/einsatzlanung/getskills',
        einsatzplanController.getskills),

    app.post('/db/einsatzlanung/update',
        einsatzplanController.update),        
        
    app.get('/db/einsatzlanung/getmhp',
        einsatzplanController.getmhp
        ),
    app.get('/db/einsatzlanung/getheller',
        einsatzplanController.getheller
        ),
    app.get('/db/einsatzlanung/getbenz',
        einsatzplanController.getbenz
        ),
    app.get('/db/einsatzlanung/getuserskills',
        einsatzplanController.getuserskills
        ),
    app.post('/db/einsatzplanung/queryusers',
        einsatzplanController.queryusers
    ),
    app.post('/db/profil/userskill',
        profilController.getuserskills
    ),
    app.post('/db/profil/updateuserskills',
        profilController.updateuserskills
    ),
    app.post('/db/profil/uploadimage',upload.single('userimg'),
        profilController.uploadfiles
    ),
    app.post('/db/profil/updateuser',
        profilController.updateuser)


            
}        
        
      

