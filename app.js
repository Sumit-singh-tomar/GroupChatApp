const http = require('http')
const express = require('express')
const sequelize = require('./Connection/database')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const accountRouter = require('./routes/account')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/account', accountRouter)
app.use(express.static(path.join(__dirname, "public")))

sequelize.sync().then((result) => {
    console.log("Database Connected Successfully");
}).catch((e)=>{
    console.log("Database Connection Failed!")
})

const server = http.createServer(app)

server.listen(3000);