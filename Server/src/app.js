 const express = require('express')
 const bodyParser = require ('body-parser')
 const morgan = require ('morgan')
 const cors = require ('cors')
 const multer  = require('multer')
 const {sequelize} =require ('./db/models')
 const config = require ('./config/config')
 
 const app = express()
 app.use(morgan('combined'))
 app.use(bodyParser.json())
 app.use(cors())
require('./routes')(app)
var upload = multer({ dest: '@/assets/userimages' })
    
    
 
 sequelize.sync()
 .then(()=> {
    app.listen(config.port)
    console.log('Server started on Port ${config.port} ')
 })

