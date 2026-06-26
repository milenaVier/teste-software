const messagesService = require('./messagesService');

exports.create = async (req, res) => {
    const { content } = req.body;
    const itemId = req.params.id;
    const senderId = req.session.userId;

    if (!senderId) {
        return res.redirect('/login');
    }

    await messagesService.createMessage(
        content,
        itemId,
        senderId
    );
    
    req.flash('success', 'Mensagem enviada!');
    res.redirect(`/items/${itemId}`);
};