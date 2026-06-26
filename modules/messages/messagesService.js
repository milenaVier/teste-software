const Messages = require('./messagesModel');
const Item = require('../item/itemModel');

exports.createMessage = async(content, userId, itemId) => {
    if (!userId) {
        throw new Error('Usuário não autenticado');
    }
    if (!content || content.trim() === '') {
        throw new Error('Mensagem não pode ser vazia');
    }
    const item = await Item.findByPk(itemId);

    if (!item) {
        throw new Error('Item não encontrado');
    }
    if (item.userId === userId) {
        throw new Error('Você não pode enviar mensagens para seu próprio item');
    }
    const message = await Messages.create({
        content,
        itemId,
        senderId: userId
    });
    return message;
};

exports.getMessagesByItem = async(itemId) => {
    const item = await Item.findByPk(itemId);
    
    if (!item) {
        throw new Error('Item não encontrado');
    }

    const messages = await Messages.findAll({
        where: { itemId },
        order: [['createdAt', 'ASC']]
    });
    return messages;
};
