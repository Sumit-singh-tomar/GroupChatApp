const sequelize = require('../Connection/database')
const { DataTypes } = require('sequelize')

const Usergroup = sequelize.define("usergroup", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    isAdmin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull:false,
    }
})


module.exports = Usergroup;