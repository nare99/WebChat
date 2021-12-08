const sequelize = require('.');
const { DataTypes } = require('sequelize');
const Messages = require('./Messages');

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    hashedPassword: {
        type: DataTypes.STRING(60),
        allowNull: false,
    }
}, {
    
});

module.exports =  Users;