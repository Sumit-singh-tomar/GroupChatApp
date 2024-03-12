const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('groupchatapp', 'root', 'root1234', {
    dialect:'mysql',
    host:'localhost',
})

module.exports = sequelize;