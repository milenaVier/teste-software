const express = require('express');
const router = express.Router();
const itemController = require('./itemController');
const messagesController = require('../messages/messagesController');
const itemService = require('./itemService');
const isAuthenticated = require('../../middlewares/auth');

router.get("/items", itemController.listarItens);

router.get('/items/new', isAuthenticated, (req, res) => {
    res.render('views/item/new');
});

router.post("/items", isAuthenticated, itemController.criarItem);

router.get("/items/:id", itemController.show);

router.post("/items/:id/messages", isAuthenticated, messagesController.create);

router.post("/items/:id/resolve", isAuthenticated, itemController.resolve);


module.exports = router;