const sequelize = require('../Connection/database')
const { DataTypes } = require('sequelize');
const Account = require('./account');

const Group = sequelize.define('group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    groupname: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})


module.exports = Group;
