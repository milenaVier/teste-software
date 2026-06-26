const Item = require('./itemModel');

exports.createItem = async(title, description, type, location, userId) => {
    if (!userId) {
        throw new Error('Usuário não autenticado');
    }
    const validTypes = ['Achado', 'Perdido'];
    if (!validTypes.includes(type)) {
        throw new Error('TIpo Inválido');
    }
    const status = 'Em aberto';

    const newItem = await Item.create({
        title,
        description,
        type,
        location,
        status,
        userId
    });
    return newItem;
};

exports.getAllItem = async(type) => {
    const where = {};

    if (type) {
        const validTypes = ['Achado', 'Perdido'];

        if (!validTypes.includes(type)) {
            throw new Error('Tipo inválido');
        }
        where.type = type;
    }    
    return await Item.findAll({ where });
};

exports.getItemById = async(id) => {
    const item = await Item.findByPk(id);
    if (!item) {
        throw new Error('Item não encontrado');
    }
    return item;
};

exports.resolvedItem = async(itemId, userId) => {
    const item = await Item.findByPk(itemId);
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