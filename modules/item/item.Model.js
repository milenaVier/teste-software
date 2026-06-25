const { DataTypes } = require('sequelize');
const sequelize = require ('../../config/database');

const Item = sequelize.define('Item', 
    {
        id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title:          {},
        description:    {},
        type:           {},
        location:       {},
        status:         {},
        userId:         {}
    },
    {
        timestamps: true,
        tableName: 'items'
    }
)