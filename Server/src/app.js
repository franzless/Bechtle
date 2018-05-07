 const express = require('express')
 const bodyParser = require ('body-parser')

 const app = express()
 app.use(morgan('combined'))
 app.use(body-parser.json())

 app.listen(process.env.PORT ||8081)