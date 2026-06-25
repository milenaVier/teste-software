const { DataTypes } = require('sequelize');
const sequelize = require ('../../config/database');

const Item = sequelize.define('Item', 
    {
        id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title:          { type: DataTypes.STRING, allowNull: false },
        description:    { type: DataTypes.STRING, allowNull: false },
        type:           { type: DataTypes.ENUM('Achado', 'Perdido'), allowNull: false },
        location:       { type: DataTypes.STRING, allowNull: false },
        status:         { type: DataTypes.ENUM('Em aberto', 'Resolvido'), allowNull: false },
        userId:         { type: DataTypes.INTEGER, allowNull: false }
    },
    {
        timestamps: true,
        tableName: 'items'
    }
);

module.exports = Item;