const sequelize = require('../Connection/database')
const { DataTypes } = require('sequelize')

const account = sequelize.define('account', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailid: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phonenumber: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false,
    }

})

module.exports = account;