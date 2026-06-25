const itemService = require('./itemService');

exports.listarItens = async (req, res) => {
    const { type } = req.query;
    const items = await itemService.getAllItem(type);

    res.render('views/item/index', { items });

};