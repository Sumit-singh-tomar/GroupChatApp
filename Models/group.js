const sequelize = require('../Connection/database')
const { DataTypes } = require('sequelize')

const Group = sequelize.define('group',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    groupname : {
        type:DataTypes.STRING,
        allowNull: false,
    },
    // members:{
    //     type:DataTypes.ARRAY
    // }
})


module.exports = Group;
