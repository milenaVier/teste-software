const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Messages = sequelize.define('Messages', 
    {
        id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        content:        { type: DataTypes.STRING, allowNull: false },
        itemPostId:     { type: DataTypes.INTEGER, allowNull: false },
        senderId:       { type: DataTypes.INTEGER, allowNull: false }
    },
    {
        timestamps: true,
        tableName: 'messages'
    }
);
itemMessage.associate = (models) => {
    itemMessage.belongsTo(models.itemPost, {
        foreingKey: 'ItemPostId',
        as: 'item'
    });
    itemMessage.belongsTo(models.User, {
        foreingKey: 'senderId',
        as: 'sender'
    });
    return itemMessage;
};