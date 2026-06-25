const { DataTypes } = require('sequelize');
const sequelize = require ('../../config/database');

const User = sequelize.define('User',
    {
        id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name:       { type: DataTypes.STRING, allowNull: false, unique: true },
        email:      { type: DataTypes.STRING, allowNull: false, unique: true },
        password:   { type: DataTypes.STRING, allowNull: false}
    },
    {
        timestamps: true,
        tableName: 'users'
    }
);

User.associate = (models) => {
    User.hasMany(models.ItemPost, {
        foreignKey: 'userId',
        as: 'item'
    });
    User.hasMany(models.ItemMessage, {
        foreignKey: 'senderId',
        as: 'sentMessages'
    });
};

module.exports = User;