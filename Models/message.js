const sequelize = require('../Connection/database')
const { DataTypes } = require('sequelize')


const message = sequelize.define('message',{
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    message:{
        type:DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = message;