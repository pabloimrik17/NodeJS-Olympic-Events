const express = require('express');
const router = express.Router();

const mainController = require('./controllers/main.controller');
const eventsController = require('./controllers/events.controller');

router.get('/', mainController.showHome);
router.get('/events', eventsController.showEvents);
router.get('/events/:slug', eventsController.showEvent);

module.exports = router;