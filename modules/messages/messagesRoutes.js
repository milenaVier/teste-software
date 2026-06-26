const express = require('express');
const router = express.Router();
const messagesController = require('./messagesController');
const isAuthenticated = require('../../middlewares/auth');

router.post('/items/:id/messages', isAuthenticated, messagesController.create);

module.exports = router;