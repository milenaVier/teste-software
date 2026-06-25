const Item = require('./itemModel');
const { ItemPost } = require('./itemModel');

exports.createItem = async(title, description, type, location, userId) => {
    if (!userId) {
        throw new Error('Usuário não autenticado');
    }
    const validTypes = ['Achado', 'Perdido'];
    if (!validTypes.includes(type)) {
        throw new Error('TIpo Inválido');
    }
    const status = 'open';
    const newItem = await ItemPost.create({
        title,
        description,
        type,
        location,
        status,
        userId
    });
    return newItem;
};

exports.getAllItem = async() => {
    const where = {};
    if (type) {
        const validTypes = ['Achadao', 'Perdido'];

        if (!validTypes.includes(type)) {
            throw new Error('Tipo inválido');
        }
        where.type = type;
    }
    const items = await ItemPost.findAll({ where });
    
    return items;
};

exports.getItemById = async(id) => {
    const item = await ItemPost.findByPk(id);
    if (!item) {
        throw new Error('Item não encontrado');
    }
    return item;
};

exports.resolvedItem = async(itemId, userId) => {
    const item = await ItemPost.findByPk(itemId);
    if (!item) {
        throw new Error('Item não encontradado');
    }
    if (item.userId !== userId) {
        throw new Error('Não autorizado');
    }
    item.status = 'Resolvido';
    await item.save();

    return item;
};