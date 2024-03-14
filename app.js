const http = require('http')
const express = require('express')
require('dotenv').config()
const sequelize = require('./Connection/database')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const Message = require('./Models/message')
const Account = require('./Models/account')

const accountRouter = require('./routes/account')
const messageRouter = require('./routes/message')

const app = express()

app.use(cors({
    methods:['GET','POST','PUT','DELETE']
}))
app.use(bodyParser.json())

app.use('/account', accountRouter)
app.use('/message', messageRouter)
app.use(express.static(path.join(__dirname, "public")))

Account.hasMany(Message);
Message.belongsTo(Account,{
    constraints: true,
    onDelete:'CASCADE',
});

sequelize.sync().then((result) => {
    console.log("Database Connected Successfully");
}).catch((e)=>{
    console.log("Database Connection Failed!")
})

const server = http.createServer(app)

server.listen(process.env.PORT || 3000);