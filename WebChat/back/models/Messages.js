
const { DataTypes } = require('sequelize');
const sequelize = require('.');
const Users = require('./Users');

const Messages = sequelize.define('Messages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id',
        }
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id',
        }
    },
    message: {
        type: DataTypes.STRING(1400),
        allowNull: false
    }
}, {

});

Messages.belongsTo(Users, {as: 'sender', foreignKey: 'sender_id', targetKey: 'id'});
Messages.belongsTo(Users, {as: 'receiver', foreignKey: 'receiver_id', targetKey: 'id'});
module.exports = Messages;