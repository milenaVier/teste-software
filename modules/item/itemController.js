const itemService = require('./itemService');
const asyncHandler = require('../../middlewares/asyncHandler');

exports.listarItens = asyncHandler (async (req, res) => {
    const { type } = req.query;
    const items = await itemService.getAllItem(type);

    res.render('item/index', { items });
});

exports.criarItem = asyncHandler (async (req, res) => {
    console.log(req.body);
    const { title, description, type, location} = req.body;
    const userId = req.session.user?.id;

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

    res.redirect(`/items/${item.id}`);
});

exports.show = asyncHandler (async (req, res) => {
    const { id } = req.params;
    const item = await itemService.getItemById(id);

    res.render('item/show', { item, chatMessages: [] });
});

exports.resolve = asyncHandler (async (req, res) => {
    const { id } = req.params;
    const userId = req.session.user?.id;

    await itemService.resolvedItem(id, userId);
    req.flash('success', 'Item resolvido!');

    res.redirect(`/items/${id}`);
});
