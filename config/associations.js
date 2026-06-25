const User = require('../modules/user/userModel');
const Item = require('../modules/item/itemModel');
const Messages = require('../modules/messages/messagesModel');

User.hasMany(Item, {foreignKey: "userId"});
Item.belongsTo(User, {foreignKey: "userId"});


User.hasMany(Messages, {foreignKey: "senderId"});
Messages.belongsTo(User, {foreignKey: "senderId"});

User.hasMany(Messages, {foreignKey: "receiverId"});
Messages.belongsTo(User, {foreignKey: "receiverId"});

Item.hasMany(Messages, {foreignKey: "itemId"});
Messages.belongsTo(Item, {foreignKey: "itemId"});