const itemService = require('./itemService');

exports.listarItens = async (req, res) => {
    const { type } = req.query;
    const items = await itemService.getAllItem(type);

    res.render('views/item/index', { items });
};

exports.criarItem = async (req, res) => {
    const { title, description, type, location} = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.redirect('/login');
    }

    const item = await itemService.createItem(
        title,
        description,
        type,
        location,
        userId
    );

    res.redirect(`/item/${item.id}`);
};

exports.show = async (req, res) => {
    const { id } = req.params;
    const item = await itemService.getItemById(id);

    res.render('views/item/show', { item });
};

exports.resolve = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    await itemService.resolvedItem(id, userId);
    req.flash('success', 'Item resolvido!');

    res.redirect(`/item/${id}`);
};
